import mongoose from 'mongoose';
import Invoice from '../Invoice';

describe('Invoice Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/billing_test');
  });

  afterAll(async () => {
    await Invoice.deleteMany({});
    await mongoose.connection.close();
  });

  it('create & save invoice successfully', async () => {
    const invoiceData = {
      userId: new mongoose.Types.ObjectId(),
      invoiceNumber: 'INV-1001',
      date: new Date(),
      totalAmount: 100,
      lineItems: [
        {
          description: 'Item 1',
          quantity: 1,
          price: 100,
          total: 100,
        },
      ],
      status: 'Pending',
    };
    const validInvoice = new Invoice(invoiceData);
    const savedInvoice = await validInvoice.save();

    expect(savedInvoice._id).toBeDefined();
    expect(savedInvoice.invoiceNumber).toBe(invoiceData.invoiceNumber);
    expect(savedInvoice.totalAmount).toBe(invoiceData.totalAmount);
  });
});