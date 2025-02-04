import { Router, RequestHandler } from 'express';
import { createInvoice, getInvoices, getInvoiceById, updateInvoice, deleteInvoice } from '../controllers/InvoiceController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate as RequestHandler, createInvoice);
router.get('/', authenticate as RequestHandler, getInvoices);
router.get('/:id', authenticate as RequestHandler, getInvoiceById);
router.put('/:id', authenticate as RequestHandler, updateInvoice);
router.delete('/:id', authenticate as RequestHandler, deleteInvoice);

export default router;