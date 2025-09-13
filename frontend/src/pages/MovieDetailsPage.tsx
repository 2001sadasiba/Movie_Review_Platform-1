import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { movieDetails } from '../services/movieService';
import type { RootState } from '../store/store';
import { Footer, Header, MovieDetails } from '../components';

interface Movie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: { Source: string; Value: string }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
}

const MovieDetailsPage: React.FC = () => {
    const { imdbID } = useParams<{ imdbID: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        const fetchMovie = async () => {
            if (!token || !imdbID) return;

            setLoading(true);
            try {
                const response = await movieDetails({ movieId: imdbID, token });

                if (response.success && response.data) {
                    setMovie(response.data);
                } else {
                    setError("Movie not found");
                }
            } catch (err: any) {
                setError("Failed to load movie details");
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [imdbID, token]);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5">{error}</div>;
    if (!movie) return <div className="text-center mt-5">No movie data available</div>;

    
    return (
        <div>
            <Header />

            <main className="main">
                <div className="container">
                    <MovieDetails movie={movie} />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MovieDetailsPage;
