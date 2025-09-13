import { Schema, model, Document } from 'mongoose';

export interface IRating {
    Source: string;
    Value: string;
}

export interface IMovie extends Document {
    imdbID: string;
    Title: string;
    Year: string;
    Rated?: string;
    Released?: string;
    Runtime?: string;
    Genre?: string;
    Director?: string;
    Writer?: string;
    Actors?: string;
    Plot?: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    Poster?: string;
    Ratings?: IRating[];
    Metascore?: string;
    imdbRating?: string;
    imdbVotes?: string;
    Type?: string;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
    createdAt: Date;
    updatedAt: Date;
}

const MovieSchema = new Schema<IMovie>(
    {
        imdbID: {
            type: String,
            required: true,
            unique: true,
        },
        Title: { type: String, required: true },
        Year: String,
        Rated: String,
        Released: String,
        Runtime: String,
        Genre: String,
        Director: String,
        Writer: String,
        Actors: String,
        Plot: String,
        Language: String,
        Country: String,
        Awards: String,
        Poster: String,
        Ratings: [
            {
                Source: String,
                Value: String,
            },
        ],
        Metascore: String,
        imdbRating: String,
        imdbVotes: String,
        Type: String,
        DVD: String,
        BoxOffice: String,
        Production: String,
        Website: String,
    },
    {
        timestamps: true,
    }
);

export const MovieModel = model<IMovie>('Movie', MovieSchema);
