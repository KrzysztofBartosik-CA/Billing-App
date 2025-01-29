import request from 'supertest';
import {app} from '../../index'; // Assuming you have an Express app instance in app.ts
import RefundRequest from '../../models/RefundRequest';
import mongoose from 'mongoose';

jest.mock('../../models/RefundRequest');

describe('RefundRequestController', () => {
  describe('createRefundRequest', () => {
    it('should create a new refund request', async () => {
      const refundRequestData = {
        invoiceId: new mongoose.Types.ObjectId().toString(),
        userId: new mongoose.Types.ObjectId().toString(),
        reason: 'Test reason',
        status: 'Pending',
        requestDate: new Date().toISOString(),
      };

      (RefundRequest.prototype.save as jest.Mock).mockResolvedValue(refundRequestData);

      const response = await request(app)
        .post('/refund-requests')
        .send(refundRequestData)
        .expect(201);

      expect(response.body).toMatchObject(refundRequestData);
    });

    it('should return 500 if there is an error', async () => {
      (RefundRequest.prototype.save as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      const refundRequestData = {
        invoiceId: new mongoose.Types.ObjectId().toString(),
        userId: new mongoose.Types.ObjectId().toString(),
        reason: 'Test reason',
        status: 'Pending',
        requestDate: new Date().toISOString(),
      };

      await request(app)
        .post('/refund-requests')
        .send(refundRequestData)
        .expect(500);
    });
  });

  describe('getRefundRequests', () => {
    it('should return all refund requests', async () => {
      const refundRequests = [
        {
          invoiceId: new mongoose.Types.ObjectId().toString(),
          userId: new mongoose.Types.ObjectId().toString(),
          reason: 'Test reason',
          status: 'Pending',
          requestDate: new Date().toISOString(),
        },
      ];

      (RefundRequest.find as jest.Mock).mockResolvedValue(refundRequests);

      const response = await request(app).get('/refund-requests').expect(200);
      expect(response.body).toEqual(refundRequests);
    });

    it('should return 500 if there is an error', async () => {
      (RefundRequest.find as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      await request(app).get('/refund-requests').expect(500);
    });
  });

  describe('getRefundRequestById', () => {
    it('should return a refund request by ID', async () => {
      const refundRequest = {
        _id: new mongoose.Types.ObjectId().toString(),
        invoiceId: new mongoose.Types.ObjectId().toString(),
        userId: new mongoose.Types.ObjectId().toString(),
        reason: 'Test reason',
        status: 'Pending',
        requestDate: new Date().toISOString(),
      };

      (RefundRequest.findById as jest.Mock).mockResolvedValue(refundRequest);

      const response = await request(app)
        .get(`/refund-requests/${refundRequest._id}`)
        .expect(200);

      expect(response.body).toEqual(refundRequest);
    });

    it('should return 404 if refund request not found', async () => {
      (RefundRequest.findById as jest.Mock).mockResolvedValue(null);

      const nonExistentId = new mongoose.Types.ObjectId().toString();
      await request(app).get(`/refund-requests/${nonExistentId}`).expect(404);
    });

    it('should return 500 if there is an error', async () => {
      (RefundRequest.findById as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      const refundRequestId = new mongoose.Types.ObjectId().toString();
      await request(app).get(`/refund-requests/${refundRequestId}`).expect(500);
    });
  });

  describe('updateRefundRequest', () => {
    it('should update a refund request by ID', async () => {
      const refundRequest = {
        _id: new mongoose.Types.ObjectId().toString(),
        invoiceId: new mongoose.Types.ObjectId().toString(),
        userId: new mongoose.Types.ObjectId().toString(),
        reason: 'Test reason',
        status: 'Pending',
        requestDate: new Date().toISOString(),
      };

      const updatedData = {
        reason: 'Updated reason',
        status: 'Approved',
        requestDate: new Date().toISOString(),
      };

      (RefundRequest.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedData);

      const response = await request(app)
        .put(`/refund-requests/${refundRequest._id}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toEqual(updatedData);
    });

    it('should return 404 if refund request not found', async () => {
      (RefundRequest.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const nonExistentId = new mongoose.Types.ObjectId().toString();
      const updatedData = {
        reason: 'Updated reason',
        status: 'Approved',
        requestDate: new Date().toISOString(),
      };

      await request(app)
        .put(`/refund-requests/${nonExistentId}`)
        .send(updatedData)
        .expect(404);
    });

    it('should return 500 if there is an error', async () => {
      (RefundRequest.findByIdAndUpdate as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      const refundRequestId = new mongoose.Types.ObjectId().toString();
      const updatedData = {
        reason: 'Updated reason',
        status: 'Approved',
        requestDate: new Date().toISOString(),
      };

      await request(app)
        .put(`/refund-requests/${refundRequestId}`)
        .send(updatedData)
        .expect(500);
    });
  });

  describe('deleteRefundRequest', () => {
    it('should delete a refund request by ID', async () => {
      const refundRequest = {
        _id: new mongoose.Types.ObjectId().toString(),
        invoiceId: new mongoose.Types.ObjectId().toString(),
        userId: new mongoose.Types.ObjectId().toString(),
        reason: 'Test reason',
        status: 'Pending',
        requestDate: new Date().toISOString(),
      };

      (RefundRequest.findByIdAndDelete as jest.Mock).mockResolvedValue(refundRequest);

      await request(app)
        .delete(`/refund-requests/${refundRequest._id}`)
        .expect(200);

      const deletedRefundRequest = await RefundRequest.findById(refundRequest._id);
      expect(deletedRefundRequest).toBeNull();
    });

    it('should return 404 if refund request not found', async () => {
      (RefundRequest.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const nonExistentId = new mongoose.Types.ObjectId().toString();
      await request(app).delete(`/refund-requests/${nonExistentId}`).expect(404);
    });

    it('should return 500 if there is an error', async () => {
      (RefundRequest.findByIdAndDelete as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      const refundRequestId = new mongoose.Types.ObjectId().toString();
      await request(app).delete(`/refund-requests/${refundRequestId}`).expect(500);
    });
  });
});