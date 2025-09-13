import { ReviewModel, IReview } from '../models';

export class ReviewRepository {
    /**
     * 
     */
    private static instance: ReviewRepository;

    /**
     * 
     */
    private constructor() { }

    /**
     * 
     * @returns 
     */
    public static getInstance(): ReviewRepository {
        if (!ReviewRepository.instance) {
            ReviewRepository.instance = new ReviewRepository();
        }
        return ReviewRepository.instance;
    }


    /**
     * 
     * @param reviewData 
     * @returns 
     */
    async createReview(reviewData: Partial<IReview>): Promise<IReview> {
        const review = new ReviewModel(reviewData);
        return await review.save();
    }

    /**
     * 
     * @param movieId 
     * @returns 
     */
    async getReviewsByMovieId(movieId: string): Promise<IReview[]> {
        return await ReviewModel.find({ movieId })
            .populate('userId', 'username email')
            .sort({ createdAt: -1 })
            .exec();
    }

    /**
     * 
     * @param userId 
     * @returns 
     */
    async getReviewsByUserId(userId: string): Promise<IReview[]> {
        return await ReviewModel.find({ userId })
            .sort({ createdAt: -1 })
            .exec();
    }


    /**
     * 
     * @param movieId 
     * @returns 
     */
    async getAverageRatingByMovieId(movieId: string): Promise<number> {
        const result = await ReviewModel.aggregate([
            { $match: { movieId } },
            { $group: { _id: null, averageRating: { $avg: '$rating' } } }
        ]);
        return result.length > 0 ? result[0].averageRating : 0;
    }
}