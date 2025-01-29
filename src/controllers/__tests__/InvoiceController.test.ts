// controllers/__tests__/InvoiceController.test.ts
import request from 'supertest';
import { app } from '../../index'; // Assuming you have an Express app instance in app.ts
import Invoice from '../../models/Invoice';
import mongoose from 'mongoose';

jest.mock('../../models/Invoice');

describe('InvoiceController', () => {
  describe('createInvoice', () => {
    it('should create a new invoice', async () => {
      const invoiceData = {
        userId: new mongoose.Types.ObjectId().toString(),
        invoiceNumber: 'INV-001',
        date: new Date().toISOString(),
        totalAmount: 100,
        lineItems: [
          { description: 'Item 1', quantity: 1, price: 50, total: 50, tax: 5 },
          { description: 'Item 2', quantity: 1, price: 50, total: 50, tax: 5 },
        ],
        status: 'Pending',
      };

      (Invoice.prototype.save as jest.Mock).mockResolvedValue(invoiceData);

      const response = await request(app)
        .post('/invoices')
        .send(invoiceData)
        .expect(201);

      expect(response.body).toMatchObject(invoiceData);
    });

    it('should return 500 if there is an error', async () => {
      (Invoice.prototype.save as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      const invoiceData = {
        userId: new mongoose.Types.ObjectId().toString(),
        invoiceNumber: 'INV-001',
        date: new Date().toISOString(),
        totalAmount: 100,
        lineItems: [
          { description: 'Item 1', quantity: 1, price: 50, total: 50, tax: 5 },
          { description: 'Item 2', quantity: 1, price: 50, total: 50, tax: 5 },
        ],
        status: 'Pending',
      };

      await request(app)
        .post('/invoices')
        .send(invoiceData)
        .expect(500);
    });
  });

  describe('updateInvoice', () => {
    it('should update an invoice by ID', async () => {
      const invoice = {
        _id: new mongoose.Types.ObjectId().toString(),
        userId: new mongoose.Types.ObjectId().toString(),
        invoiceNumber: 'INV-001',
        date: new Date().toISOString(),
        totalAmount: 100,
        lineItems: [
          { description: 'Item 1', quantity: 1, price: 50, total: 50, tax: 5 },
          { description: 'Item 2', quantity: 1, price: 50, total: 50, tax: 5 },
        ],
        status: 'Pending',
      };

      const updatedData = {
        invoiceNumber: 'INV-002',
        date: new Date().toISOString(),
        totalAmount: 200,
        lineItems: [
          { description: 'Item 1', quantity: 2, price: 50, total: 100, tax: 10 },
          { description: 'Item 2', quantity: 2, price: 50, total: 100, tax: 10 },
        ],
        status: 'Approved',
      };

      (Invoice.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedData);

      const response = await request(app)
        .put(`/invoices/${invoice._id}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toEqual(updatedData);
    });

    it('should return 404 if invoice not found', async () => {
      (Invoice.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const nonExistentId = new mongoose.Types.ObjectId().toString();
      const updatedData = {
        invoiceNumber: 'INV-002',
        date: new Date().toISOString(),
        totalAmount: 200,
        lineItems: [
          { description: 'Item 1', quantity: 2, price: 50, total: 100, tax: 10 },
          { description: 'Item 2', quantity: 2, price: 50, total: 100, tax: 10 },
        ],
        status: 'Approved',
      };

      await request(app)
        .put(`/invoices/${nonExistentId}`)
        .send(updatedData)
        .expect(404);
    });

    it('should return 500 if there is an error', async () => {
      (Invoice.findByIdAndUpdate as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      const invoiceId = new mongoose.Types.ObjectId().toString();
      const updatedData = {
        invoiceNumber: 'INV-002',
        date: new Date().toISOString(),
        totalAmount: 200,
        lineItems: [
          { description: 'Item 1', quantity: 2, price: 50, total: 100, tax: 10 },
          { description: 'Item 2', quantity: 2, price: 50, total: 100, tax: 10 },
        ],
        status: 'Approved',
      };

      await request(app)
        .put(`/invoices/${invoiceId}`)
        .send(updatedData)
        .expect(500);
    });
  });
});