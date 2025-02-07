import express from 'express';
import mongoose from 'mongoose';
import Invoice from '../models/Invoice';
import RefundRequest from '../models/RefundRequest';

const router = express.Router();

router.post('/invoices/:invoiceId/refund', async (req, res) => {
    const { invoiceId } = req.params;
    const { description } = req.body;
    const userId = req.user._id; // Assuming you have user authentication middleware

    try {
        // Find the invoice
        const invoice = await Invoice.findById(invoiceId);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Create a new refund request
        const refundRequest = new RefundRequest({
            invoiceId: mongoose.Types.ObjectId(invoiceId),
            userId: mongoose.Types.ObjectId(userId),
            reason: description,
            status: 'pending',
            requestDate: new Date(),
        });

        // Save the refund request
        await refundRequest.save();

        // Update the invoice status to 'pending'
        invoice.status = 'pending';
        await invoice.save();

        res.status(201).json({ message: 'Refund request created successfully' });
    } catch (error) {
        console.error('Error creating refund request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;