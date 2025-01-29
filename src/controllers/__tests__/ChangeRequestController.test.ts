import request from 'supertest';
import {app} from '../../index'; // Assuming you have an Express app instance in app.ts
import ChangeRequest from '../../models/ChangeRequest';
import mongoose from 'mongoose';

jest.mock('../../models/ChangeRequest');

describe('ChangeRequestController', () => {
  describe('createChangeRequest', () => {
    it('should create a new change request', async () => {
      const changeRequestData = {
        invoiceId: new mongoose.Types.ObjectId().toString(),
        lineItemId: new mongoose.Types.ObjectId().toString(),
        requestedChange: {
          description: 'Test description',
          quantity: 1,
          price: 100,
        },
        status: 'Pending',
        requestDate: new Date().toISOString(),
      };

      (ChangeRequest.prototype.save as jest.Mock).mockResolvedValue(changeRequestData);

      const response = await request(app)
        .post('/change-requests')
        .send(changeRequestData)
        .expect(201);

      expect(response.body).toMatchObject(changeRequestData);
    });

    it('should return 500 if there is an error', async () => {
      (ChangeRequest.prototype.save as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      const changeRequestData = {
        invoiceId: new mongoose.Types.ObjectId().toString(),
        lineItemId: new mongoose.Types.ObjectId().toString(),
        requestedChange: {
          description: 'Test description',
          quantity: 1,
          price: 100,
        },
        status: 'Pending',
        requestDate: new Date().toISOString(),
      };

      await request(app)
        .post('/change-requests')
        .send(changeRequestData)
        .expect(500);
    });
  });

  describe('getChangeRequests', () => {
    it('should return all change requests', async () => {
      const changeRequests = [
        {
          invoiceId: new mongoose.Types.ObjectId().toString(),
          lineItemId: new mongoose.Types.ObjectId().toString(),
          requestedChange: {
            description: 'Test description',
            quantity: 1,
            price: 100,
          },
          status: 'Pending',
          requestDate: new Date().toISOString(),
        },
      ];

      (ChangeRequest.find as jest.Mock).mockResolvedValue(changeRequests);

      const response = await request(app).get('/change-requests').expect(200);
      expect(response.body).toEqual(changeRequests);
    });

    it('should return 500 if there is an error', async () => {
      (ChangeRequest.find as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      await request(app).get('/change-requests').expect(500);
    });
  });

  describe('getChangeRequestById', () => {
    it('should return a change request by ID', async () => {
      const changeRequest = {
        _id: new mongoose.Types.ObjectId().toString(),
        invoiceId: new mongoose.Types.ObjectId().toString(),
        lineItemId: new mongoose.Types.ObjectId().toString(),
        requestedChange: {
          description: 'Test description',
          quantity: 1,
          price: 100,
        },
        status: 'Pending',
        requestDate: new Date().toISOString(),
      };

      (ChangeRequest.findById as jest.Mock).mockResolvedValue(changeRequest);

      const response = await request(app)
        .get(`/change-requests/${changeRequest._id}`)
        .expect(200);

      expect(response.body).toEqual(changeRequest);
    });

    it('should return 404 if change request not found', async () => {
      (ChangeRequest.findById as jest.Mock).mockResolvedValue(null);

      const nonExistentId = new mongoose.Types.ObjectId().toString();
      await request(app).get(`/change-requests/${nonExistentId}`).expect(404);
    });

    it('should return 500 if there is an error', async () => {
      (ChangeRequest.findById as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test error - requestById');
      });

      const changeRequestId = new mongoose.Types.ObjectId().toString();
      await request(app).get(`/change-requests/${changeRequestId}`).expect(500);
    });
  });

  describe('updateChangeRequest', () => {
    it('should update a change request by ID', async () => {
      const changeRequest = {
        _id: new mongoose.Types.ObjectId().toString(),
        invoiceId: new mongoose.Types.ObjectId().toString(),
        lineItemId: new mongoose.Types.ObjectId().toString(),
        requestedChange: {
          description: 'Test description',
          quantity: 1,
          price: 100,
        },
        status: 'Pending',
        requestDate: new Date().toISOString(),
      };

      const updatedData = {
        requestedChange: {
          description: 'Updated description',
          quantity: 2,
          price: 200,
        },
        status: 'Approved',
        requestDate: new Date().toISOString(),
      };

      (ChangeRequest.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedData);

      const response = await request(app)
        .put(`/change-requests/${changeRequest._id}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toEqual(updatedData);
    });

    it('should return 404 if change request not found', async () => {
      (ChangeRequest.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const nonExistentId = new mongoose.Types.ObjectId().toString();
      const updatedData = {
        requestedChange: {
          description: 'Updated description',
          quantity: 2,
          price: 200,
        },
        status: 'Approved',
        requestDate: new Date().toISOString(),
      };

      await request(app)
        .put(`/change-requests/${nonExistentId}`)
        .send(updatedData)
        .expect(404);
    });

    it('should return 500 if there is an error', async () => {
      (ChangeRequest.findByIdAndUpdate as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test error - updateChangeRequest');
      });

      const changeRequestId = new mongoose.Types.ObjectId().toString();
      const updatedData = {
        requestedChange: {
          description: 'Updated description',
          quantity: 2,
          price: 200,
        },
        status: 'Approved',
        requestDate: new Date().toISOString(),
      };

      await request(app)
        .put(`/change-requests/${changeRequestId}`)
        .send(updatedData)
        .expect(500);
    });
  });

  describe('deleteChangeRequest', () => {
    it('should delete a change request by ID', async () => {
      const changeRequest = {
        _id: new mongoose.Types.ObjectId().toString(),
        invoiceId: new mongoose.Types.ObjectId().toString(),
        lineItemId: new mongoose.Types.ObjectId().toString(),
        requestedChange: {
          description: 'Test description',
          quantity: 1,
          price: 100,
        },
        status: 'Pending',
        requestDate: new Date().toISOString(),
      };

      (ChangeRequest.findByIdAndDelete as jest.Mock).mockResolvedValue(changeRequest);

      await request(app)
        .delete(`/change-requests/${changeRequest._id}`)
        .expect(200);

      const deletedChangeRequest = await ChangeRequest.findById(changeRequest._id);
      expect(deletedChangeRequest).toBeNull();
    });

    it('should return 404 if change request not found', async () => {
      (ChangeRequest.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const nonExistentId = new mongoose.Types.ObjectId().toString();
      await request(app).delete(`/change-requests/${nonExistentId}`).expect(404);
    });

    it('should return 500 if there is an error', async () => {
      (ChangeRequest.findByIdAndDelete as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test error - deleteChangeRequest');
      });

      const changeRequestId = new mongoose.Types.ObjectId().toString();
      await request(app).delete(`/change-requests/${changeRequestId}`).expect(500);
    });
  });
});