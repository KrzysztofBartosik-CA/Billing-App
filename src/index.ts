import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import invoiceRoutes from './routes/invoiceRoutes';
import changeRequestRoutes from './routes/changeRequestRoutes';
import refundRequestRoutes from './routes/refundRequestRoutes';
import authRoutes from './routes/authRoutes';

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

app.get('/', (req, res) => {
    const currentDate = new Date();
    const options = { year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    res.send(formattedDate);
});

app.use('/invoices', invoiceRoutes);
app.use('/change-requests', changeRequestRoutes);
app.use('/refund-requests', refundRequestRoutes);
app.use('/auth', authRoutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

export {app};