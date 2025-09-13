import mongoose, { Document, Schema, Model } from 'mongoose';

enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

enum UserActiveStatus {
    ACTIVE = 'active',
    DEACTIVE = 'deactive'
}

export interface IUser extends Document {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'firstname is required'],
            trim: true,
        },
        middleName: {
            type: String,
            required: false,
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Lastname is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.USER,
        },
        status: {
            type: String,
            enum: Object.values(UserActiveStatus),
            required: true,
            default: UserActiveStatus.ACTIVE,
        }

    },
    {
        timestamps: true,
    }
);

export const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
