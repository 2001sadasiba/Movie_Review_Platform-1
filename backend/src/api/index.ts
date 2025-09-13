import { Router } from 'express';
import UserRoutes from './users.api';
import MovieRoutes from './movie.api';
import ReviewRoutes from './review.api';

const router = Router();

// Base route: /api/v1/customers
router.use('/users', UserRoutes);
router.use('/movies', MovieRoutes);
router.use('/rev', ReviewRoutes);

export default router;
