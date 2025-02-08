// models/ChangeRequest.ts
import mongoose from 'mongoose';
import { Invoice } from '../types/invoiceTypes';

const changeRequestSchema = new mongoose.Schema({
  invoiceId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Invoice' },
  updatedInvoice: {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    date: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    invoiceNumber: { type: String, required: true },
    status: { type: String, required: true },
    lineItems: [{
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true },
      tax: { type: Number, required: true }
    }]
  },
  requestDate: { type: Date, required: true },
  responseDate: { type: Date }
});

const ChangeRequest = mongoose.model('ChangeRequest', changeRequestSchema);
export default ChangeRequest;