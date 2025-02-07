import { Request, Response } from 'express';
import mongoose from 'mongoose';
import validator from 'validator';
import RefundRequest from '../models/RefundRequest';

export const createRefundRequest = async (req: Request, res: Response) => {
  try {
    const refundRequestData = {
      invoiceId: new mongoose.Types.ObjectId(req.body.invoiceId),
      userId: new mongoose.Types.ObjectId(req.body.userId),
      reason: validator.escape(req.body.reason),
      status: validator.escape(req.body.status),
      requestDate: new Date(req.body.requestDate),
    };

    const validRefundRequest = new RefundRequest(refundRequestData);
    const savedRefundRequest = await validRefundRequest.save();
    res.status(201).json(savedRefundRequest);
  } catch (error) {
    console.error('Error saving refund request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getRefundRequests = async (req: Request, res: Response) => {
  try {
    const refundRequests = await RefundRequest.find();
    res.status(200).json(refundRequests);
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
      return
    }
    res.status(200).json(refundRequest);
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