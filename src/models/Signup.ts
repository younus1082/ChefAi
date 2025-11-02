import mongoose, { Schema, Document } from 'mongoose';

export interface ISignup extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  registrationDate: Date;
  ipAddress?: string;
  userAgent?: string;
  registrationSource: string;
  isEmailVerified: boolean;
  lastLoginDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SignupSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  avatar: {
    type: String,
    default: '👤'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    default: null
  },
  userAgent: {
    type: String,
    default: null
  },
  registrationSource: {
    type: String,
    default: 'web_app'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  lastLoginDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Create indexes for better performance
SignupSchema.index({ email: 1 });
SignupSchema.index({ registrationDate: -1 });
SignupSchema.index({ isEmailVerified: 1 });

export default function getSignupModel(connection: mongoose.Connection) {
  return connection.model<ISignup>('Signup', SignupSchema);
}