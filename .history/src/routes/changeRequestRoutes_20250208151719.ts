import {RequestHandler, Router} from 'express';
import { createChangeRequest, getChangeRequests, getChangeRequestById, updateChangeRequest, deleteChangeRequest, acceptChangeRequest } from '../controllers/ChangeRequestController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate as RequestHandler, createChangeRequest);
router.get('/', authenticate as RequestHandler, getChangeRequests);
router.get('/:id', authenticate as RequestHandler, getChangeRequestById);
router.put('/:id', authenticate as RequestHandler, updateChangeRequest);
router.delete('/:id', authenticate as RequestHandler, deleteChangeRequest);
router.delete('/:id/accept', authenticate as RequestHandler, acceptChangeRequest);

export default router;