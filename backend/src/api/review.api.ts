import { Router } from 'express';
import { ReviewController } from '../controllers';
import { authMiddleware } from '../middleware';

const router = Router();
const reviewController = ReviewController.getInstance();

// Protected route - requires authentication
router.post('/movies/:movieId/reviews', authMiddleware, reviewController.createReview.bind(reviewController));
router.get('/movies/:movieId/reviews', authMiddleware, reviewController.getMovieReviews.bind(reviewController));

export default router;