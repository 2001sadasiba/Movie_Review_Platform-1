import { Router } from 'express';
import { UserController } from '../controllers';
import { authMiddleware } from '../middleware';
import { sanitizeUserData } from '../middleware';

const router = Router();
const userController = UserController.getInstance();

/**
 * Public Routes
 */
router.post('/register', sanitizeUserData, userController.createUser.bind(userController));
router.post('/login', userController.loginUser.bind(userController));


/**
 * Protected routes
 */
router.get('/auth-check', authMiddleware, userController.checkAuth.bind(userController));
router.get('/me', authMiddleware, userController.getMyProfile.bind(userController));
router.put('/me', authMiddleware, sanitizeUserData, userController.updateMyProfile.bind(userController));
router.post('/logout', authMiddleware, userController.logoutUser.bind(userController));


export default router;
