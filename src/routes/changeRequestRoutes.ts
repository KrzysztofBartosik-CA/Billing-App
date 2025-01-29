import { Router } from 'express';
import { createChangeRequest, getChangeRequests, getChangeRequestById, updateChangeRequest, deleteChangeRequest } from '../controllers/ChangeRequestController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate, createChangeRequest);
router.get('/', authenticate, getChangeRequests);
router.get('/:id', authenticate, getChangeRequestById);
router.put('/:id', authenticate, updateChangeRequest);
router.delete('/:id', authenticate, deleteChangeRequest);

export default router;