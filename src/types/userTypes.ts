import {Request} from "express";

export interface AuthenticatedRequest extends Request {
    user?: User;
}

export type User = {
    _id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    email: string;
    role: 'user' | 'admin';
}