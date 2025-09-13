import { Response } from 'express';
import { ApiResponse } from '../interfaces';

export const sendSuccess = <T = any>(
    res: Response,
    message: string,
    data?: T,
    statusCode = 200
) => {
    const response: ApiResponse<T> = {
        success: true,
        message,
        status: statusCode,
    };

    if (data !== undefined) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

export const sendError = (
    res: Response,
    message: string,
    statusCode = 500
) => {
    const response: ApiResponse = {
        success: false,
        message,
        status: statusCode,
    };

    return res.status(statusCode).json(response);
};
