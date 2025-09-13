import { Request, Response } from 'express';
import { ReviewService } from '../services';
import { AuthenticatedRequest } from '../middleware';
import { sendSuccess, sendError } from '../utils';



export class ReviewController {

    /**
     * 
     */
    private static instance: ReviewController;
    private reviewService: ReviewService;

    /**
     * 
     */
    private constructor() {
        this.reviewService = ReviewService.getInstance();
    }

    /**
     * 
     * @returns 
     */
    public static getInstance(): ReviewController {
        if (!ReviewController.instance) {
            ReviewController.instance = new ReviewController();
        }
        return ReviewController.instance;
    }




    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async createReview(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            const { movieId } = req.params;
            const { ratings, reviewText } = req.body;
            const userId = req.user?.userId;

            if (!userId) {
                return sendError(res, 'User not authenticated', 401);
            }

            console.log("THe ratings we get", ratings);

            // Validate input
            if (!ratings || Number(ratings) < 1 || Number(ratings) > 5) {
                return sendError(res, 'Rating must be between 1 and 5', 400);
            }

            if (!reviewText || reviewText.trim().length === 0) {
                return sendError(res, 'Review text is required', 400);
            }

            const review = await this.reviewService.createReview(userId.toString(), movieId, ratings, reviewText.trim());

            return sendSuccess(res, 'Review created successfully', review, 201);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async getMovieReviews(req: Request, res: Response): Promise<Response> {
        try {
            const { movieId } = req.params;
            const reviews = await this.reviewService.getReviewsByMovieId(movieId);
            return sendSuccess(res, 'Review created successfully', reviews, 200);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }
}