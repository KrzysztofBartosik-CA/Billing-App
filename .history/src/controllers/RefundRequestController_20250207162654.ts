import { Request, Response } from 'express';
import mongoose from 'mongoose';
import validator from 'validator';
import Invoice from '../models/Invoice';
import RefundRequest from '../models/RefundRequest';
import User from '../models/User';
import { AuthenticatedRequest, User as UserType } from '../types/userTypes';
import { RefundRequestDTO } from '../dtos/RefundRequestDTO';
import { Invoice as InvoiceType } from '../types/invoiceTypes';
import { formatUser } from './userController';

export const createRefundRequest = async (req: AuthenticatedRequest, res: Response) => {
    const { invoiceId } = req.params;
    const { description } = req.body;
    const userId = req?.user?._id; // Assuming you have user authentication middleware

    try {
        // Find the invoice
        const invoice = await Invoice.findById(invoiceId);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Create a new refund request
        const refundRequest = new RefundRequest({
            invoiceId: new mongoose.Types.ObjectId(invoiceId), // Use 'new' keyword
            userId: new mongoose.Types.ObjectId(userId), // Use 'new' keyword
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
        return;
    } catch (error) {
        console.error('Error creating refund request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getRefundRequests = async (req: Request, res: Response) => {
    try {
        const refundRequests = await RefundRequest.find();
        const refundRequestDTOs = await Promise.all(refundRequests.map(async (request) => {
            const user = await User.findById(request.userId);
            const invoice = await Invoice.findById(request.invoiceId);
            const formattedUser = user ? formatUser(user) : null;
            return new RefundRequestDTO(formattedUser as unknown as UserType, invoice as unknown as InvoiceType, request.reason, request.requestDate);
        }));
        res.status(200).json(refundRequestDTOs);
    } catch (error) {
        console.error('Error fetching refund requests:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getRefundRequestById = async (req: Request, res: Response) => {
    try {
        const refundRequest = await RefundRequest.findById(req.params.id);
        if (!refundRequest) {
            res.status(404).json({ error: 'Refund request not found' });
            return;
        }
        const user = await User.findById(refundRequest.userId);
        const invoice = await Invoice.findById(refundRequest.invoiceId);
        const refundRequestDTO = new RefundRequestDTO(user as unknown as UserType, invoice as unknown as InvoiceType, refundRequest.reason, refundRequest.requestDate);
        res.status(200).json(refundRequestDTO);
    } catch (error) {
        console.error('Error fetching refund request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateRefundRequest = async (req: Request, res: Response) => {
    try {
        const refundRequestData = {
            reason: validator.escape(req.body.reason),
            status: validator.escape(req.body.status),
            requestDate: new Date(req.body.requestDate),
        };

        const updatedRefundRequest = await RefundRequest.findByIdAndUpdate(req.params.id, refundRequestData, { new: true });
        if (!updatedRefundRequest) {
            res.status(404).json({ error: 'Refund request not found' });
            return;
        }
        res.status(200).json(updatedRefundRequest);
    } catch (error) {
        console.error('Error updating refund request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteRefundRequest = async (req: Request, res: Response) => {
    try {
        const deletedRefundRequest = await RefundRequest.findByIdAndDelete(req.params.id);
        if (!deletedRefundRequest) {
            res.status(404).json({ error: 'Refund request not found' });
            return;
        }
        res.status(200).json({ message: 'Refund request deleted successfully' });
    } catch (error) {
        console.error('Error deleting refund request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};