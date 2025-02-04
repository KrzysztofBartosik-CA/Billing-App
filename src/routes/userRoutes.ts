import express from 'express';
import {createUser, getUsers, getUserById, updateUser, deleteUser} from '../controllers/userController';
import {authenticate} from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticate, createUser);
router.get('/', authenticate, getUsers);
router.get('/:id', authenticate, getUserById);
router.patch('/:id', updateUser);
router.delete('/:id', authenticate, deleteUser);

export default router;