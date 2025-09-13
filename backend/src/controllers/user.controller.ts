import { Request, Response } from 'express';
import { UserService } from '../services';
import { JWTService } from '../utils';
import { Types } from 'mongoose';
import { sendSuccess, sendError } from '../utils';
import { AuthenticatedRequest } from '../middleware';



export class UserController {

    /**
     * 
     */
    private static instance: UserController;
    private userService: UserService;

    /**
     * 
     */
    private constructor() {
        this.userService = UserService.getInstance();
    }

    /**
     * 
     * @returns 
     */
    public static getInstance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }

    /**
     * @route POST /api/v1/users/register
     */
    async createUser(req: Request, res: Response): Promise<Response> {
        try {

            /**
             * 
             */
            const user = await this.userService.createUser(req.body);
            if (!user) {
                return sendError(res, 'User details not found', 404);
            }

            /**
             * 
             */
            const payload = { userId: user._id as Types.ObjectId, email: user.email, role: user.role };
            const jwtService = JWTService.getInstance();
            const token = jwtService.generateToken(payload);
            if (!token) {
                return sendError(res, 'Token details not found', 404);
            }

            /**
             * 
             */
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000,
            });

            /**
             * 
             */
            return sendSuccess(res, 'User created successfully', { token: token }, 201);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    /**
     * @route POST /api/users/login
     */
    async loginUser(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return sendError(res, 'Email and password are required', 400);
            }

            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                return sendError(res, 'Invalid email or password', 401);
            }

            const passwordValid = await this.userService.verifyPassword(password, user.password);
            if (!passwordValid) {
                return sendError(res, 'Invalid email or password', 401);
            }

            /**
             * Generate JWT token
             */
            const payload = {
                userId: user._id as Types.ObjectId,
                email: user.email,
                role: user.role,
            };
            const token = JWTService.getInstance().generateToken(payload);

            /**
             * Set HTTP-only cookie
             */
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000,
            });

            return sendSuccess(res, 'User login successful', { token: token }, 200);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    /**
     * @route GET /api/users/auth-check
     * @description Check if user is authenticated
     */
    async checkAuth(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            if (!req.user) {
                return sendError(res, 'User not authenticated', 401);
            }

            return sendSuccess(res, 'User is authenticated', '', 200);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    /**
     * @route GET /api/v1/users/me
     * @desc Get current logged-in user's data
     */
    async getMyProfile(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            if (!req.user) {
                return sendError(res, 'User not authenticated', 401);
            }

            const user = await this.userService.getUserById(req.user.userId);
            if (!user) {
                return sendError(res, 'User not found', 404);
            }

            // Exclude password
            const { password, ...userWithoutPassword } = user.toObject();

            return sendSuccess(res, 'User profile fetched successfully', userWithoutPassword, 200);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    /**
     * @route PUT /api/v1/users/me
     * @desc Update current logged-in user's name or password
     */
    async updateMyProfile(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            if (!req.user) {
                return sendError(res, 'User not authenticated', 401);
            }

            // Validate input fields (optional, can use a validator library)
            const { firstName, middleName, lastName, password } = req.body;
            if (!firstName && !middleName && !lastName && !password) {
                return sendError(res, 'No fields provided for update', 400);
            }

            // Call service layer
            const updatedUser = await this.userService.updateProfile(
                req.user.userId,
                { firstName, middleName, lastName, password }
            );

            if (!updatedUser) {
                return sendError(res, 'User not found', 404);
            }

            // Exclude password before sending response
            const { password: _, ...userWithoutPassword } = updatedUser.toObject();

            return sendSuccess(res, 'User profile updated successfully', userWithoutPassword, 200);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    /**
     * @route POST /api/v1/users/logout
     * @desc Logout user by clearing the token cookie
     */
    async logoutUser(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            // Clear the token cookie
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });

            return sendSuccess(res, 'User logged out successfully', undefined, 200);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }
}
