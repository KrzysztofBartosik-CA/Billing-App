import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import invoiceRoutes from './routes/invoiceRoutes';
import changeRequestRoutes from './routes/changeRequestRoutes';
import refundRoutes from './routes/refundRoutes'; // Updated import
import authRoutes from './routes/authRoutes';
import userRoutes from "./routes/userRoutes";

const app = express();
const port = 2000;
const FRONTEND_ORIGIN = 'http://localhost:3000'

mongoose.connect('mongodb://localhost:27017/billing')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Enable CORS
const corsOptions = {
    origin: FRONTEND_ORIGIN, // Replace with your frontend's origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/invoices', invoiceRoutes);
app.use('/change-requests', changeRequestRoutes);
app.use('/refunds', refundRoutes); // Updated route
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

export { app };