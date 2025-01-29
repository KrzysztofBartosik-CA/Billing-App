import {Request, Response} from 'express';
import mongoose from 'mongoose';
import validator from 'validator';
import ChangeRequest from '../models/ChangeRequest';

export const createChangeRequest = async (req: Request, res: Response) => {
    try {
        const changeRequestData = {
            invoiceId: new mongoose.Types.ObjectId(req.body.invoiceId),
            lineItemId: new mongoose.Types.ObjectId(req.body.lineItemId),
            requestedChange: {
                description: validator.escape(req.body.requestedChange.description),
                quantity: req.body.requestedChange.quantity,
                price: req.body.requestedChange.price,
            },
            status: validator.escape(req.body.status),
            requestDate: new Date(req.body.requestDate),
        };

        const validChangeRequest = new ChangeRequest(changeRequestData);
        const savedChangeRequest = await validChangeRequest.save();
        res.status(201).json(savedChangeRequest);
    } catch (error) {
        console.error('Error saving change request:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export const getChangeRequests = async (req: Request, res: Response) => {
    try {
        const changeRequests = await ChangeRequest.find();
        res.status(200).json(changeRequests);
    } catch (error) {
        console.error('Error fetching change requests:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export const getChangeRequestById = async (req: Request, res: Response): Promise<void> => {
    try {
        const changeRequest = await ChangeRequest.findById(req.params.id);
        if (!changeRequest) {
            res.status(404).json({message: 'Change Request not found'});
            return;
        }
        res.json(changeRequest);
    } catch (error) {
        console.error('Error fetching change request by ID:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export const updateChangeRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedChangeRequest = await ChangeRequest.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedChangeRequest) {
            res.status(404).json({message: 'Change Request not found'});
            return;
        }
        res.json(updatedChangeRequest);
    } catch (error) {
        console.error('Error updating change request:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export const deleteChangeRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedChangeRequest = await ChangeRequest.findByIdAndDelete(req.params.id);
        if (!deletedChangeRequest) {
            res.status(404).json({message: 'Change Request not found'});
            return;
        }
        res.json({message: 'Change Request deleted successfully'});
    } catch (error) {
        console.error('Error deleting change request:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};