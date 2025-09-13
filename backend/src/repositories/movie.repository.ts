import { MovieModel, IMovie } from '../models';

export class MovieRepository {
    /**
     * 
     */
    private static instance: MovieRepository;

    /**
     * 
     */
    private constructor() { }

    /**
     * 
     * @returns 
     */
    public static getInstance(): MovieRepository {
        if (!MovieRepository.instance) {
            MovieRepository.instance = new MovieRepository();
        }
        return MovieRepository.instance;
    }

    /**
     * 
     * @param imdbId 
     * @returns 
     */
    async findMovieByImdbId(imdbId: string): Promise<IMovie | null> {
        return await MovieModel.findOne({ imdbId }).exec();
    }

    /**
     * 
     * @param movieData 
     * @returns 
     */
    async createMovie(movieData: Partial<IMovie>): Promise<IMovie> {
        console.log("The movie IMDB id we get", movieData.imdbID);
        const existingMovie = await MovieModel.findOne({ imdbID: movieData.imdbID });

        if (existingMovie) {
            return existingMovie;
        }
        const movie = new MovieModel(movieData);
        return await movie.save();
    }

    /**
     * 
     * @param imdbId 
     * @param averageRating 
     * @returns 
     */
    async updateMovieRating(imdbId: string, averageRating: number): Promise<IMovie | null> {
        return await MovieModel.findOneAndUpdate(
            { imdbId },
            { imdbRating: averageRating.toFixed(1) },
            { new: true }
        ).exec();
    }

    /**
     * 
     * @param movieData 
     * @returns 
     */
    async findOrCreate(movieData: Partial<IMovie>): Promise<IMovie> {
        let movie = await this.findMovieByImdbId(movieData.imdbID!);
        if (!movie) {
            movie = await this.createMovie(movieData);
        }
        return movie;
    }
}