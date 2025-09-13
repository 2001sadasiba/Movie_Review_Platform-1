import { ReviewRepository, MovieRepository } from '../repositories';
import { IReview } from '../models';
import { Types } from "mongoose";
import { OMDbService } from "./OMDBService";

export class ReviewService {
    /**
     * 
     */
    private static instance: ReviewService;
    private reviewRepository: ReviewRepository;
    private movieRepository: MovieRepository;
    private omdbService: OMDbService;

    /**
     * 
     */
    private constructor() {
        this.reviewRepository = ReviewRepository.getInstance();
        this.movieRepository = MovieRepository.getInstance();
        this.omdbService = OMDbService.getInstance();
    }

    /**
     * 
     */
    public static getInstance(): ReviewService {
        if (!ReviewService.instance) {
            ReviewService.instance = new ReviewService();
        }
        return ReviewService.instance;
    }

    /**
     * 1. Create the review
     */
    async createReview(userId: string, movieId: string, rating: number, reviewText: string): Promise<IReview> {
        
        const movieDetails = await this.omdbService.getMovieById(movieId);
        

        const review = await this.reviewRepository.createReview({
            userId: new Types.ObjectId(userId),
            movieId,
            rating,
            reviewText
        });

        await this.movieRepository.createMovie(movieDetails);
        await this.updateMovieAverageRating(movieId);

        return review;
    }

    /**
     * 
     * @param movieId 
     */
    private async updateMovieAverageRating(movieId: string): Promise<void> {
        const averageRating = await this.reviewRepository.getAverageRatingByMovieId(movieId);
        await this.movieRepository.updateMovieRating(movieId, averageRating);
    }

    /**
     * 
     * 
     */
    async getReviewsByMovieId(movieId: string): Promise<IReview[]> {
        return await this.reviewRepository.getReviewsByMovieId(movieId);
    }

    /**
     * 
     * 
     */
    async getReviewsByUserId(userId: string): Promise<IReview[]> {
        return await this.reviewRepository.getReviewsByUserId(userId);
    }
}