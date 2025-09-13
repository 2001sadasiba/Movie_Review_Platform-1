import { Types } from 'mongoose';

export interface IJwtPayload {
  userId: Types.ObjectId;
  email: string;
  role: string;
}