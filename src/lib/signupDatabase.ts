import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface GlobalWithSignupMongoose {
  signupMongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

declare const global: GlobalWithSignupMongoose;

let cached = global.signupMongoose;

if (!cached) {
  cached = global.signupMongoose = { conn: null, promise: null };
}

async function connectSignupDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 30000,
      dbName: 'chefai_signups' // Separate database for signups
    };

    cached.promise = mongoose.createConnection(MONGODB_URI, opts).asPromise();
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ Connected to signup database successfully');
    return cached.conn;
  } catch (e) {
    console.error('❌ Failed to connect to signup database:', e);
    throw e;
  }
}

export default connectSignupDB;