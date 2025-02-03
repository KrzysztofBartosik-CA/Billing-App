// authRoutes.ts
import { Router } from 'express';
import { register, login, checkAuth } from '../controllers/AuthController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', authenticate, checkAuth);
router.post('/logout', (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'Logout successful' });
});

export default router;