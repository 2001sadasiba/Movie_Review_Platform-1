import express from 'express';
import { MovieController } from '../controllers';
import { authMiddleware } from '../middleware';

const router = express.Router();
const movieController = MovieController.getInstance(); 

// Protected route - requires authentication
router.get('/search', authMiddleware, movieController.searchMovies.bind(movieController));
router.get('/:imdbId', authMiddleware, movieController.getMovieById.bind(movieController));

export default router;