import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, changePassword } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticate, createUser);
router.get('/', authenticate, getUsers);
router.get('/:id', authenticate, getUserById);
router.patch('/:id', updateUser);
router.delete('/:id', authenticate, deleteUser);
router.post('/change-password', authenticate, changePassword);

export default router;