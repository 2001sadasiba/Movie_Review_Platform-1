import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { getMovieByName } from '../services/movieService';
import '../styles/MovieList.css';
import { useNavigate } from 'react-router-dom';

interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
}

const MovieList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const navigate = useNavigate();

    const token = useSelector((state: RootState) => state.auth.token);

    // Function to fetch movies from API
    const fetchMovies = async (query: string) => {
        if (!query.trim() || !token) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await getMovieByName({
                movieName: query,
                token
            });

            // Check the actual structure of your API response
            if (response.success && response.data) {
                setMovies(response.data);
            } else if (response.Search) { // For OMDB API structure
                setMovies(response.Search);
            } else {
                setMovies([]);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch movies');
            setMovies([]);
        } finally {
            setIsLoading(false);
            setIsInitialLoad(false);
        }
    };

    const handleMovieClick = (imdbID: string) => {
        navigate(`/movie/${imdbID}`);
    };

    // Load "Popular" on initial render
    useEffect(() => {
        if (token && isInitialLoad) {
            fetchMovies('Popular');
        }
    }, [token, isInitialLoad]);

    // Debounced search effect for user input
    useEffect(() => {
        // Don't run on initial load or if search term is empty and we already have movies
        if (isInitialLoad || (!searchTerm && movies.length > 0)) return;

        const timer = setTimeout(() => {
            if (searchTerm) {
                fetchMovies(searchTerm);
            } else {
                // If search term is cleared, show "Popular" again
                fetchMovies('Popular');
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, token]);

    return (
        <div className="movie-list">
            <h1 className="text-center mb-4">Discover Amazing Movies</h1>

            <div className="search-container">
                <div className="search-icon">🔍</div>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search for movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {error && <div className="error-message">{error}</div>}

            {isLoading ? (
                <div className="loading"><div className="spinner"></div></div>
            ) : (
                <div className="movie-grid">
                    {movies.map(movie => (
                        <div key={movie.imdbID} className="movie-card" onClick={() => handleMovieClick(movie.imdbID)}>
                            <img
                                src={movie.Poster && movie.Poster.trim().toUpperCase() !== 'N/A'
                                    ? movie.Poster
                                    : 'https://via.placeholder.com/300x450?text=No+Poster'}
                                alt={movie.Title}
                                className="movie-poster"
                            />
                            <div className="movie-info">
                                <h3 className="movie-title">{movie.Title}</h3>
                                <p className="movie-year">{movie.Year} • {movie.Type}</p>
                                <div className="movie-rating">
                                    <span className="rating-stars">Click for details</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {movies.length === 0 && !isLoading && !isInitialLoad && (
                <div className="text-center mt-5">
                    <h3>No movies found</h3>
                    <p>Try searching with different keywords</p>
                </div>
            )}
        </div>
    );
};

export default MovieList;