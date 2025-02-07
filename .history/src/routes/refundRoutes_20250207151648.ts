import express, { RequestHandler } from 'express';
import { createRefundRequest } from '../controllers/RefundRequestController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/invoices/:invoiceId/refund', authenticate as RequestHandler,  createRefundRequest as RequestHandler);

export default router;