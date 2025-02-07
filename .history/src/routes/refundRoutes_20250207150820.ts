import express from 'express';
import { createRefundRequest } from '../controllers/RefundRequestController';

const router = express.Router();

router.post('/invoices/:invoiceId/refund', createRefundRequest);

export default router;