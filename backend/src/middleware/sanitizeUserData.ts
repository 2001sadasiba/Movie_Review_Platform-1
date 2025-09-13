import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils';

export const sanitizeUserData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.body.firstName) {
            const sanitizedFirstName = req.body.firstName.trim();
            if (!/^[A-Za-z]+$/.test(sanitizedFirstName)) {
                return sendError(res, 'First name can only contain letters (A-Z, a-z)', 400);
            }
            req.body.firstName = sanitizedFirstName;
        }

        if (req.body.middleName) {
            const sanitizedMiddleName = req.body.middleName.trim();
            if (!/^[A-Za-z]*$/.test(sanitizedMiddleName)) {
                return sendError(res, 'Middle name can only contain letters (A-Z, a-z)', 400);
            }
            req.body.middleName = sanitizedMiddleName;
        }

        if (req.body.lastName) {
            const sanitizedLastName = req.body.lastName.trim();
            if (!/^[A-Za-z]+$/.test(sanitizedLastName)) {
                return sendError(res, 'Last name can only contain letters (A-Z, a-z)', 400);
            }
            req.body.lastName = sanitizedLastName;
        }

        if (req.body.email) {
            req.body.email = req.body.email.trim().toLowerCase();
        }

        if (req.body.password) {
            req.body.password = req.body.password.trim(); 
        }

        next();
    } catch (error) {
        return sendError(res, 'Invalid input data', 400);
    }
};