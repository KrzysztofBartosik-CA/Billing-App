// models/RefundRequest.ts
import mongoose from 'mongoose';

const refundRequestSchema = new mongoose.Schema({
  invoiceId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  reason: { type: String, required: true },
  status: { type: String, required: true },
  requestDate: { type: Date, required: true },
  responseDate: { type: Date }
});

const RefundRequest = mongoose.model('RefundRequest', refundRequestSchema);
export default RefundRequest;