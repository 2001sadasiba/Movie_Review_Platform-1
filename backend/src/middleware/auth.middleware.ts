import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../utils';
import { IJwtPayload } from '../interfaces';

export interface AuthenticatedRequest extends Request {
    user?: IJwtPayload; 
}

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    try {
        let token: string | undefined;

        // 1️⃣ Check Authorization header
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }

        // 2️⃣ If not in header, check cookies
        if (!token && req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Authorization token missing or invalid',
            });
            return;
        }

        const jwtService = JWTService.getInstance();
        const decoded = jwtService.verifyToken(token);
        req.user = decoded; 

        next();
    } catch (error: any) {
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
};
