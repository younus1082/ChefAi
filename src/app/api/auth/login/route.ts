import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { findUserByEmail } from '@/lib/userStorage';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    console.log('Login attempt started');
    
    console.log('Parsing request body...');
    const { email, password } = await request.json();
    console.log('Request parsed, email:', email);

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    let user;
    let useMongoFallback = false;

    try {
      // Try MongoDB first
      console.log('Connecting to MongoDB...');
      await connectDB();
      console.log('MongoDB connected successfully');

      // Find user by email
      console.log('Looking up user with email:', email.toLowerCase());
      user = await User.findOne({ email: email.toLowerCase() });
      console.log('User found in MongoDB:', user ? 'Yes' : 'No');

    } catch (mongoError) {
      console.log('MongoDB connection failed, using fallback storage:', mongoError instanceof Error ? mongoError.message : String(mongoError));
      useMongoFallback = true;

      // Find user in fallback storage
      console.log('Looking up user in fallback storage with email:', email.toLowerCase());
      user = findUserByEmail(email);
      console.log('User found in fallback storage:', user ? 'Yes' : 'No');
    }

    if (!user) {
      console.log('User not found, returning 401');
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    console.log('Verifying password...');
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isValidPassword);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id.toString(),
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data (without password) and token
    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatar
    };
    
    // Create response with user data and token
    const response = NextResponse.json({
      user: userResponse,
      token,
      message: `Login successful${useMongoFallback ? ' (using fallback storage)' : ''}`
    });

    // Set the auth token as an HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);

    // Provide more specific error messages based on the error type
    if (error instanceof Error && (error.name === 'MongooseServerSelectionError' || error.name === 'MongoNetworkError')) {
      return NextResponse.json(
        { error: 'Database connection failed. Please try again later.' },
        { status: 503 }
      );
    }

    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}