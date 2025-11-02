import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import connectSignupDB from '@/lib/signupDatabase';
import User from '@/models/User';
import getSignupModel from '@/models/Signup';
import { findUserByEmail, createUser } from '@/lib/userStorage';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    console.log('Registration attempt started');
    
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    let newUser;
    let useMongoFallback = false;
    let signupRecord = null;

    try {
      // Try MongoDB first
      console.log('Connecting to MongoDB...');
      await connectDB();
      console.log('MongoDB connected successfully');

      // Also connect to signup database
      console.log('Connecting to signup database...');
      const signupConnection = await connectSignupDB();
      const SignupModel = getSignupModel(signupConnection);
      console.log('Signup database connected successfully');

      // Check if user already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        );
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Get client information
      const clientIP = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';

      // Create new user in main database
      newUser = new User({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        avatar: '👤'
      });

      // Save user to main database
      await newUser.save();
      console.log('User saved successfully to MongoDB:', newUser.email);

      // Create signup record in separate database
      signupRecord = new SignupModel({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        avatar: '👤',
        registrationDate: new Date(),
        ipAddress: clientIP,
        userAgent: userAgent,
        registrationSource: 'web_app',
        isEmailVerified: false
      });

      // Save signup information to separate database
      await signupRecord.save();
      console.log('Signup information saved to signup database:', signupRecord.email);

    } catch (mongoError) {
      console.log('MongoDB connection failed, using fallback storage:', mongoError instanceof Error ? mongoError.message : String(mongoError));
      useMongoFallback = true;

      // Check if user already exists in fallback storage
      const existingUser = findUserByEmail(email);
      if (existingUser) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        );
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user in fallback storage
      newUser = createUser({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        avatar: '👤'
      });

      console.log('User saved successfully to fallback storage:', newUser.email);
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser._id.toString(),
        email: newUser.email 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data (without password) and token
    const userResponse = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar
    };
    
    // Create response with user data and token
    const response = NextResponse.json({
      user: userResponse,
      token,
      message: `Registration successful${useMongoFallback ? ' (using fallback storage)' : ' - Data stored in both main and signup databases'}`,
      signupRecorded: !useMongoFallback && signupRecord !== null
    }, { status: 201 });

    // Set the auth token as an HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
    });

    return response;

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}