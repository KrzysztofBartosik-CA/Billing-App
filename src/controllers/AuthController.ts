import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'default_secret';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    if (error.code === 11000) { // Duplicate key error
      res.status(400).json({ error: 'Username already exists' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
    res.status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set secure flag only in production
        sameSite: 'strict'
      })
      .json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};