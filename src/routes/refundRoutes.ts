import express, { RequestHandler } from 'express';
import { createRefundRequest, deleteRefundRequest, getRefundRequestById, getRefundRequests, updateRefundRequest, acceptRefundRequest } from '../controllers/RefundRequestController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/invoices/:invoiceId/refund', authenticate as RequestHandler, createRefundRequest as RequestHandler);
router.post('/', authenticate as RequestHandler, createRefundRequest as RequestHandler);
router.get('/', authenticate as RequestHandler, getRefundRequests);
router.get('/:id', authenticate as RequestHandler, getRefundRequestById);
router.put('/:id', authenticate as RequestHandler, updateRefundRequest);
router.delete('/:id', authenticate as RequestHandler, deleteRefundRequest);
router.post('/:id/accept', authenticate as RequestHandler, acceptRefundRequest as RequestHandler); // New endpoint

export default router;