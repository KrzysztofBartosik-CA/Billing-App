import {Request, Response} from 'express';
import mongoose from 'mongoose';
import validator from 'validator';
import Invoice from '../models/Invoice';

export const createInvoice = async (req: Request, res: Response) => {
    try {
        const invoiceData = {
            userId: new mongoose.Types.ObjectId(req.body.userId),
            invoiceNumber: validator.escape(req.body.invoiceNumber || ''),
            date: new Date(req.body.date),
            totalAmount: req.body.totalAmount,
            lineItems: req.body.lineItems.map((item: any) => ({
                description: validator.escape(item.description || ''),
                quantity: item.quantity,
                price: item.price,
                total: item.total,
                tax: item.tax
            })),
            status: 'unpaid'
        };

        const validInvoice = new Invoice(invoiceData);
        const savedInvoice = await validInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (error) {
        console.error('Error saving invoice:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getInvoices = async (req: Request, res: Response) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export const getInvoiceById = async (req: Request, res: Response) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            res.status(404).json({error: 'Invoice not found'});
            return;
        }
        res.status(200).json(invoice);
    } catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export const updateInvoice = async (req: Request, res: Response) => {
    try {
        const invoiceData = {
            invoiceNumber: validator.escape(req.body.invoiceNumber),
            date: new Date(req.body.date),
            totalAmount: req.body.totalAmount,
            lineItems: req.body.lineItems.map((item: any) => ({
                description: validator.escape(item.description),
                quantity: item.quantity,
                price: item.price,
                total: item.total,
                tax: item.tax // Add tax field
            })),
            status: validator.escape(req.body.status),
        };

        const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, invoiceData, {new: true});
        if (!updatedInvoice) {
            res.status(404).json({error: 'Invoice not found'});
            return;
        }
        res.status(200).json(updatedInvoice);
    } catch (error) {
        console.error('Error updating invoice:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export const deleteInvoice = async (req: Request, res: Response) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!deletedInvoice) {
            res.status(404).json({error: 'Invoice not found'});
            return;
        }
        res.status(200).json({message: 'Invoice deleted successfully'});
    } catch (error) {
        console.error('Error deleting invoice:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};