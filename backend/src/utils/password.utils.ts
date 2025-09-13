import bcrypt from 'bcryptjs';

export class PasswordUtils {
    /**
     * Singleton instance
     */
    private static instance: PasswordUtils;
    private static readonly SALT_ROUNDS = 10; // Keep it static

    /**
     * Private constructor to enforce singleton pattern
     */
    private constructor() { }

    /**
     * @returns {PasswordUtils} Singleton instance of PasswordUtils
     */
    public static getInstance(): PasswordUtils {
        if (!PasswordUtils.instance) {
            PasswordUtils.instance = new PasswordUtils();
        }
        return PasswordUtils.instance;
    }

    async hashPassword(password: string): Promise<string> {
        if (!password) {
            throw new Error('Password must be provided for hashing');
        }
        return await bcrypt.hash(password, PasswordUtils.SALT_ROUNDS);
    }

    async comparePassword(plain: string, hashed: string): Promise<boolean> {
        if (!plain || !hashed) {
            throw new Error('Both plain and hashed passwords must be provided for comparison');
        }
        return await bcrypt.compare(plain, hashed);
    }
}