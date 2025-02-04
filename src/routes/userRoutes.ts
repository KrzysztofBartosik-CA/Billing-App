import {RequestHandler, Router} from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, changePassword } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate as RequestHandler, createUser);
router.get('/', authenticate as RequestHandler, getUsers);
router.get('/:id', authenticate as RequestHandler, getUserById);
router.patch('/:id', updateUser);
router.delete('/:id', authenticate as RequestHandler, deleteUser);
router.post('/change-password', authenticate as RequestHandler, changePassword);

export default router;