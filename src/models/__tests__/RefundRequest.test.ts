import mongoose from 'mongoose';
import RefundRequest from '../RefundRequest';

describe('RefundRequest Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/billing_test');
    });

    afterAll(async () => {
        await RefundRequest.deleteMany({});
        await mongoose.connection.close();
    });

    it('create & save refund request successfully', async () => {
        const refundRequestData = {
            invoiceId: new mongoose.Types.ObjectId(),
            userId: new mongoose.Types.ObjectId(),
            reason: 'Incorrect charge',
            status: 'Pending',
            requestDate: new Date(),
        };
        const validRefundRequest = new RefundRequest(refundRequestData);
        const savedRefundRequest = await validRefundRequest.save();

        expect(savedRefundRequest._id).toBeDefined();
        expect(savedRefundRequest.reason).toBe(refundRequestData.reason);
    });
});