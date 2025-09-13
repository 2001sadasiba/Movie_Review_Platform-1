import axios from 'axios';
import { env } from '../config/env';

const API_BASE = env.BACKEND_URL;

export const getReviews = async (payload: { movieId: string, token: string }) => {
    const { token, movieId } = payload;
    const res = await axios.get(`${API_BASE}/api/v1/rev/movies/${movieId}/reviews`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const createReview = async (payload: { movieId: string, ratings: number; reviewText: string; token: string }) => {
    const { ratings, reviewText, token, movieId } = payload;

    const res = await axios.post(
        `${API_BASE}/api/v1/rev/movies/${movieId}/reviews`,
        {
            ratings,
            reviewText,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );

    return res.data;
};

