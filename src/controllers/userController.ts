import { Request, Response } from 'express';
import User from '../models/User';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            res.status(404).send();
            return
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { password, ...updateData } = req.body; // Exclude password from update data
        const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!user) {
            res.status(404).send();
            return;
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).send();
            return;
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};