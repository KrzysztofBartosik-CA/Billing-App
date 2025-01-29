import { Router } from 'express';
import { createRefundRequest, getRefundRequests, getRefundRequestById, updateRefundRequest, deleteRefundRequest } from '../controllers/RefundRequestController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate, createRefundRequest);
router.get('/', authenticate, getRefundRequests);
router.get('/:id', authenticate, getRefundRequestById);
router.put('/:id', authenticate, updateRefundRequest);
router.delete('/:id', authenticate, deleteRefundRequest);

export default router;