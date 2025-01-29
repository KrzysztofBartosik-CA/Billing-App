import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'default_secret';

interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({error: 'Access denied. No token provided.'});
        return;
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({error: 'Invalid token.'});
    }
};