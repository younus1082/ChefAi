import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { getUsers } from '@/lib/userStorage';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies instead of Authorization header
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    
    let user;
    let useMongoFallback = false;

    try {
      // Try MongoDB first
      await connectDB();
      user = await User.findById(decoded.userId);
    } catch (mongoError) {
      console.log('MongoDB connection failed, using fallback storage:', mongoError instanceof Error ? mongoError.message : String(mongoError));
      useMongoFallback = true;

      // Find user in fallback storage
      const users = getUsers();
      user = users.find(u => u._id === decoded.userId);
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user data (without password)
    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatar
    };
    
    return NextResponse.json({
      user: userResponse,
      valid: true
    });

  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}