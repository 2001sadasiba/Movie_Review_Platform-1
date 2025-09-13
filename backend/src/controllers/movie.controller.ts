import { Request, Response } from 'express';
import { OMDbService } from '../services';
import {
    OMDBMovieSearchResult,
    OMDBSingleMovieResult,
} from "../interfaces";

// We will need these once we have the models
// import { ReviewModel } from '../models/Review.model';
// import { MovieModel } from '../models/Movie.model';

export class MovieController {
    /**
         * 
         */
    private static instance: MovieController;
    private omdbService: OMDbService;

    /**
     * 
     */
    private constructor() {
        this.omdbService = OMDbService.getInstance();
    }

    /**
     * 
     * @returns 
     */
    public static getInstance(): MovieController {
        if (!MovieController.instance) {
            MovieController.instance = new MovieController();
        }
        return MovieController.instance;
    }

    async searchMovies(req: Request, res: Response): Promise<void> {
        try {
            const query = req.query.q as string;

            if (!query) {
                res.status(400).json({ success: false, message: 'Search query (q) is required' });
                return;
            }

            const results: OMDBMovieSearchResult[] = await this.omdbService.searchMovies(query);
            res.json({ success: true, data: results });

        } catch (error: any) {
            console.error('Search movies error:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getMovieById(req: Request, res: Response): Promise<void> {
        try {
            const { imdbId } = req.params;

            // 1. Get movie details from OMDB
            const movieDetails: OMDBSingleMovieResult = await this.omdbService.getMovieById(imdbId);

            // 2. TODO: Get reviews from our database for this imdbId
            // const reviews = await ReviewModel.find({ movieId: imdbId }).populate('userId', 'username');

            // 3. TODO: Check if movie exists in our DB, if not, save it? (Your optimization idea)
            // let movieInDb = await MovieModel.findOne({ imdbId });
            // if (!movieInDb) {
            //     movieInDb = await MovieModel.create({ ...movieDetails, imdbId });
            // }

            // 4. For now, just return the OMDB data
            res.json({
                success: true,
                data: {
                    ...movieDetails,
                    // reviews: reviews // Will add this later
                }
            });

        } catch (error: any) {
            console.error('Get movie by ID error:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

export const movieController = MovieController.getInstance();