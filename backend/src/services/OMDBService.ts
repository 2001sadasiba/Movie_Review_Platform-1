import axios from 'axios';
import { config } from '../config';
import {
    OMDBSearchResponse,
    OMDBMovieSearchResult,
    OMDBSingleMovieResult,
} from "../interfaces";


export class OMDbService {
    private static instance: OMDbService;
    private readonly apiKey: string;
    private readonly baseUrl: string;

    private constructor() {
        this.apiKey = config.omdb.apiKey!;
        this.baseUrl = config.omdb.baseUrl!;

        if (!this.apiKey) {
            throw new Error('OMDB API key is not configured. Please check your environment variables.');
        }
    }

    public static getInstance(): OMDbService {
        if (!OMDbService.instance) {
            OMDbService.instance = new OMDbService();
        }
        return OMDbService.instance;
    }

    async searchMovies(query: string): Promise<OMDBMovieSearchResult[]> {
        try {
            const response = await axios.get<OMDBSearchResponse>(
                `${this.baseUrl}/?apikey=${this.apiKey}&s=${encodeURIComponent(query)}`
            );

            if (response.data.Response === 'False') {
                if (response.data.Error === 'Movie not found!') {
                    return [];
                }
                throw new Error(response.data.Error || 'Failed to search movies');
            }

            // Return all items, without filtering by type
            const allItems = response.data.Search || [];

            return allItems;

        } catch (error: any) {
            console.error('OMDB Search Error:', error.message);
            throw new Error(`Failed to search movies: ${error.message}`);
        }
    }


    async getMovieById(imdbId: string): Promise<OMDBSingleMovieResult> {
        try {
            const response = await axios.get<OMDBSingleMovieResult>(
                `${this.baseUrl}/?apikey=${this.apiKey}&i=${imdbId}&plot=full`
            );

            if (response.data.Response === 'False') {
                throw new Error(response.data.Error || 'Movie not found');
            }

            return response.data;

        } catch (error: any) {
            console.error('OMDB Movie by ID Error:', error.message);
            throw new Error(`Failed to fetch movie details: ${error.message}`);
        }
    }
}

