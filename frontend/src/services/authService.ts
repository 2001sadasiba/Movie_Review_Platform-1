import axios from 'axios';
import { env } from '../config/env';

const API_BASE = env.BACKEND_URL;

export const loginUser = async (payload: { email: string; password: string }) => {
    const res = await axios.post(`${API_BASE}/api/v1/users/login`, payload);
    return res.data;
};

export const registerUser = async (payload: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}) => {
    const res = await axios.post(`${API_BASE}/api/v1/users/register`, payload);
    return res.data;
};

export const authenticateUser = async (token: string) => {
    const res = await axios.get(`${API_BASE}/api/v1/users/auth-check`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res;
}

export const getOwnDetails = async (token: string) => {
    const res = await axios.get(`${API_BASE}/api/v1/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res;
}

export const logoutUser = async (token: string) => {
    const res = await axios.post(`${API_BASE}/api/v1/users/logout`, 
        {}, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data;
}
