import { IUser, UserModel } from '../models';
import { Types } from "mongoose";

export class UserRepository {
  private static instance: UserRepository;

  private constructor() { }

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  /**
   * Create new user details
   * @param userData 
   * @returns 
   */
  public async createUser(userData: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(userData);
    return await user.save();
  }

  /**
   * Find user by email
   * @param email 
   * @returns 
   */
  public async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  /**
   * Find user by ID
   * @param userId 
   * @returns 
   */
  public async findById(userId: Types.ObjectId): Promise<IUser | null> {
    return await UserModel.findById(userId);
  }

  /**
   * Get all users
   * No @params require
   * @returns 
   */
  public async getAllUsers(): Promise<IUser[]> {
    return await UserModel.find();
  }

  /**
   * Delete user by ID
   * @param userId 
   * @returns 
   */
  public async deleteById(userId: string): Promise<IUser | null> {
    return await UserModel.findByIdAndDelete(userId);
  }

  /**
   * 
   */
  public async updateUserById(userId: Types.ObjectId, updates: Partial<IUser>): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(userId, updates, { new: true });
  }

}
