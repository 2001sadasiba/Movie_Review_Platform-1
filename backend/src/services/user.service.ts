import { UserRepository } from "../repositories";
import { IUser } from "../models";
import { PasswordUtils } from "../utils";
import { Types } from "mongoose";

export class UserService {

    /**
     * 
     */
    private static instance: UserService;
    private userRepository: UserRepository;
    private passwordUtils: PasswordUtils;

    /**
     * 
     */
    private constructor() {
        this.userRepository = UserRepository.getInstance();
        this.passwordUtils = PasswordUtils.getInstance();
    }

    /**
     * 
     * @returns 
     */
    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    /**
     * 
     * @param data 
     * @returns 
     */
    async createUser(data: Partial<IUser>): Promise<IUser> {
        if (!data.password) throw new Error('Password is required');
        const hashedPassword = await this.passwordUtils.hashPassword(data.password);
        const user = await this.userRepository.createUser({
            ...data,
            password: hashedPassword,
        });
        return user;
    }

    /**
     * 
     */
    async updateProfile(
        userId: Types.ObjectId,
        updates: Partial<{ firstName: string; middleName?: string; lastName: string; password: string }>
    ): Promise<IUser | null> {
        const updateData: any = { ...updates };

        if (updates.password) {
            const hashedPassword = await this.passwordUtils.hashPassword(updates.password);
            updateData.password = hashedPassword;
        }

        return await this.userRepository.updateUserById(userId, updateData);
    }

    /**
     * Verify password
     */
    async verifyPassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
        const passwordUtils = PasswordUtils.getInstance();
        return await passwordUtils.comparePassword(inputPassword, hashedPassword);
    }

    /**
     * Get User by email
     * @param email 
     * @returns 
     */
    public async getUserByEmail(email: string): Promise<IUser | null> {
        if (!email) {
            throw new Error("Email not found");
        }
        return await this.userRepository.findByEmail(email);
    }

    /**
     * Get user by ID
     * @param userId 
     * @returns 
     */
    public async getUserById(userId: Types.ObjectId): Promise<IUser | null> {
        if (!userId) {
            throw new Error("UserId not found");
        }
        return await this.userRepository.findById(userId);
    }
}