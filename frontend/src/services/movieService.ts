import axios from 'axios';
import { env } from '../config/env';

const API_BASE = env.BACKEND_URL;

export const getMovieByName = async (payload: { movieName: string; token: string }) => {
    const { movieName, token } = payload;
    const res = await axios.get(`${API_BASE}/api/v1/movies/search?q=${encodeURIComponent(movieName)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const movieDetails = async (payload: { movieId: string; token: string }) => {
    const { movieId, token } = payload;
    const res = await axios.get(`${API_BASE}/api/v1/movies/${movieId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};
