import { Router } from 'express';
import { createInvoice, getInvoices, getInvoiceById, updateInvoice, deleteInvoice } from '../controllers/InvoiceController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate, createInvoice);
router.get('/', authenticate, getInvoices);
router.get('/:id', authenticate, getInvoiceById);
router.put('/:id', authenticate, updateInvoice);
router.delete('/:id', authenticate, deleteInvoice);

export default router;