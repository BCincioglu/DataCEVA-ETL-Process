// src/utils/mongo.ts
import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export async function connectMongo(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in .env');
  }

  try {
    await mongoose.connect(uri, {
      dbName: 'universites_db',
      serverSelectionTimeoutMS: 5000,
    });

    logger.info('Successfully connected to MongoDB');
  } catch (error) {
    logger.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}
