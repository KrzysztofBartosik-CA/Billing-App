import {RequestHandler, Router} from 'express';
import { createRefundRequest, getRefundRequests, getRefundRequestById, updateRefundRequest, deleteRefundRequest } from '../controllers/RefundRequestController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate as RequestHandler, createRefundRequest);
router.get('/', authenticate as RequestHandler, getRefundRequests);
router.get('/:id', authenticate as RequestHandler, getRefundRequestById);
router.put('/:id', authenticate as RequestHandler, updateRefundRequest);
router.delete('/:id', authenticate as RequestHandler, deleteRefundRequest);

export default router;