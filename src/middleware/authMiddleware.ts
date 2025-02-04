import {Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import {AuthenticatedRequest, User as UserType} from '../types/userTypes';

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }

    try {
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({error: 'Internal Server Error'});
        }
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({error: 'Unauthorized'});
        }
        req.user = user as unknown as UserType;
        next();
    } catch (error) {
        res.status(401).json({error: 'Unauthorized'});
    }
};