// src/utils/jwt.ts
import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config';
import { IJwtPayload } from '../interfaces';

export class JWTService {
    
    /**
     * Singleton instance
     */
    private static instance: JWTService;
    private readonly secret: string;
    private readonly expiresIn: string = '1d';

    /**
     * Private constructor to enforce singleton pattern
     */
    private constructor() {
        const secret = config.server.jwtSecret;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        this.secret = secret;
    }

    /**
     * @returns {JWTService} Singleton instance of JWTService
     */
    public static getInstance(): JWTService {
        if (!JWTService.instance) {
            JWTService.instance = new JWTService();
        }
        return JWTService.instance;
    }

    public generateToken(payload: IJwtPayload): string {
        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn as jwt.SignOptions['expiresIn'],
        });
    }


    public verifyToken(token: string): IJwtPayload {
        try {
            return jwt.verify(token, this.secret) as IJwtPayload;
        } catch (error: any) {
            throw new Error('Invalid or expired token');
        }
    }

    public decodeToken(token: string): IJwtPayload | null {
        try {
            return jwt.decode(token) as IJwtPayload;
        } catch (error) {
            return null;
        }
    }
}
