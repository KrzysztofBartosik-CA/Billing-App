// models/ChangeRequest.ts
import mongoose from 'mongoose';

const changeRequestSchema = new mongoose.Schema({
  invoiceId: { type: mongoose.Schema.Types.ObjectId, required: true },
  lineItemId: { type: mongoose.Schema.Types.ObjectId, required: true },
  requestedChange: {
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  status: { type: String, required: true },
  requestDate: { type: Date, required: true },
  responseDate: { type: Date }
});

const ChangeRequest = mongoose.model('ChangeRequest', changeRequestSchema);
export default ChangeRequest;