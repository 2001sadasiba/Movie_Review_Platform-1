// src/utils/db.ts
import mongoose from 'mongoose';
import { config } from './env.config';

export class Database {
    private static instance: Database;
    private constructor() { }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connect(): Promise<void> {
        if (mongoose.connection.readyState >= 1) return;
        try {
            await mongoose.connect(config.database.mongoUri, {
                serverSelectionTimeoutMS: 5000,
            });
            console.log('MongoDB connected successfully');
        } catch (err) {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        }
    }
}

