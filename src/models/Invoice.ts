// models/Invoice.ts
import mongoose from 'mongoose';

const lineItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
  tax: { type: Number, required: true } // Add tax field
});

const invoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  invoiceNumber: { type: String, required: true },
  date: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  lineItems: [lineItemSchema],
  status: { type: String, required: true }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;