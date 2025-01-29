import mongoose from 'mongoose';
import ChangeRequest from '../ChangeRequest';

describe('ChangeRequest Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/billing_test');
  });

  afterAll(async () => {
    await ChangeRequest.deleteMany({});
    await mongoose.connection.close();
  });

  it('create & save change request successfully', async () => {
    const changeRequestData = {
      invoiceId: new mongoose.Types.ObjectId(),
      lineItemId: new mongoose.Types.ObjectId(),
      requestedChange: {
        description: 'Updated Item',
        quantity: 2,
        price: 50,
      },
      status: 'Pending',
      requestDate: new Date(),
    };
    const validChangeRequest = new ChangeRequest(changeRequestData);
    const savedChangeRequest = await validChangeRequest.save();

    expect(savedChangeRequest._id).toBeDefined();
    expect(savedChangeRequest.status).toBe(changeRequestData.status);
  });
});