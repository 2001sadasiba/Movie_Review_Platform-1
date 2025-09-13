import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { getReviews, createReview } from '../services/reviewService';
import '../styles/MovieDetails.css';

interface Rating {
    Source: string;
    Value: string;
}

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
    Ratings: Rating[];
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

interface Review {
    _id: string;
    userId: {
        username: string;
        email: string;
    };
    ratings: number;
    reviewText: string;
    createdAt: string;
}

interface MovieDetailsProps {
    movie: Movie;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState({
        ratings: 5,
        reviewText: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);


    const token = useSelector((state: RootState) => state.auth.token);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
        fetchReviews();
    }, [movie.imdbID, token]);

    const fetchReviews = async () => {
        if (!token) return;

        setLoadingReviews(true);
        try {
            const response = await getReviews({
                movieId: movie.imdbID,
                token
            });

            if (response.success) {
                setReviews(response.data || []);
            }
        } catch (err: any) {
            console.error('Failed to fetch reviews:', err);
        } finally {
            setLoadingReviews(false);
        }
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            setError('Please login to submit a review');
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            await createReview({
                movieId: movie.imdbID,
                ratings: newReview.ratings,
                reviewText: newReview.reviewText,
                token
            });

            // Reset form and refresh reviews
            setNewReview({ ratings: 5, reviewText: '' });
            setShowReviewForm(false);
            fetchReviews(); // Refresh the reviews list
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    const renderStarRating = (rating: number) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="movie-details">
            <div className="poster">
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/350x525?text=No+Poster'}
                    alt={`${movie.Title} Poster`}
                />
            </div>

            <div className="details">
                <h1>{movie.Title} <span>({movie.Year})</span></h1>

                <p className="meta">
                    {movie.Rated} • {movie.Runtime} • {movie.Genre}
                </p>

                <p className="plot">
                    {isExpanded ? movie.Plot : movie.Plot.slice(0, 220) + (movie.Plot.length > 220 ? '...' : '')}
                    {movie.Plot.length > 220 && (
                        <span className="toggle-plot" onClick={() => setIsExpanded(!isExpanded)}>
                            {isExpanded ? ' See Less' : ' See More'}
                        </span>
                    )}
                </p>


                <div className="info-grid">
                    <div className="info-card">
                        <strong>Director</strong>
                        <span>{movie.Director}</span>
                    </div>

                    <div className="info-card">
                        <strong>Writer</strong>
                        <span>{movie.Writer}</span>
                    </div>

                    <div className="info-card">
                        <strong>Actors</strong>
                        <span>{movie.Actors}</span>
                    </div>

                    <div className="info-card">
                        <strong>Release Date</strong>
                        <span>{movie.Released}</span>
                    </div>

                    <div className="info-card">
                        <strong>Box Office</strong>
                        <span>{movie.BoxOffice}</span>
                    </div>

                    <div className="info-card">
                        <strong>Awards</strong>
                        <span>{movie.Awards}</span>
                    </div>

                    <div className="info-card">
                        <strong>Country</strong>
                        <span>{movie.Country}</span>
                    </div>

                    <div className="info-card">
                        <strong>Language</strong>
                        <span>{movie.Language}</span>
                    </div>
                </div>

                <div className="ratings-section">
                    <h3>Ratings</h3>
                    <div className="ratings-grid">
                        {movie.Ratings.map((rating, idx) => (
                            <div key={idx} className="rating-card">
                                <div className="rating-source">{rating.Source}</div>
                                <div className="rating-value">{rating.Value}</div>
                                {rating.Source === 'Internet Movie Database' && (
                                    <div className="imdb-badge">IMDb</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
                <div className="reviews-header">
                    <h3>User Reviews ({reviews.length})</h3>
                    <button
                        className="add-review-btn"
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        disabled={!isAuthenticated}
                    >
                        {isAuthenticated ? 'Add Review' : 'Login to Review'}
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                {/* Review Form */}
                {showReviewForm && isAuthenticated && (
                    <form className="review-form" onSubmit={handleSubmitReview}>
                        <div className="form-group">
                            <label>Your Rating</label>
                            <div className="star-rating-input">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className={`star ${star <= newReview.ratings ? 'active' : ''}`}
                                        onClick={() => setNewReview({ ...newReview, ratings: star })}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Your Review</label>
                            <textarea
                                value={newReview.reviewText}
                                onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
                                placeholder="Share your thoughts about this movie..."
                                rows={4}
                                required
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => setShowReviewForm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={submitting}
                            >
                                {submitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </div>
                    </form>
                )}

                {/* Reviews List */}
                {loadingReviews ? (
                    <div className="loading">Loading reviews...</div>
                ) : reviews.length === 0 ? (
                    <div className="no-reviews">
                        <p>No reviews yet. Be the first to review!</p>
                    </div>
                ) : (
                    <div className="reviews-list">
                        {reviews.map((review) => (
                            <div key={review._id} className="review-card">
                                <div className="review-header">
                                    <div className="reviewer-info">
                                        <strong>{review.userId.username}</strong>
                                        <span>{formatDate(review.createdAt)}</span>
                                    </div>
                                    <div className="review-rating">
                                        {renderStarRating(review.ratings)}
                                    </div>
                                </div>
                                <p className="review-text">{review.reviewText}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetails;