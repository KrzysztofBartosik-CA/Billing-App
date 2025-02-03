import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    CircularProgress,
    Button
} from '@mui/material';
import {Invoice} from '../types/interfaces';
import './scss/InvoiceDetails.scss';

const InvoiceDetails = () => {
    const {id} = useParams();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await fetch(`http://localhost:2000/invoices/${id}`, {
                    credentials: 'include',
                });
                const data = await response.json();
                setInvoice(data);
            } catch (error) {
                console.error('Error fetching invoice:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoice();
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress/>
            </Box>
        );
    }

    if (!invoice) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h4" style={{opacity: 0.5}}>Invoice not found</Typography>
            </Box>
        );
    }

    return (
        <div className="invoice-details">
            <Box display="flex" alignItems="center" mb={2}>
                <Button component={Link} to="/invoices" variant="outlined" color="secondary">
                    Back to Invoices
                </Button>
            </Box>

            <Typography variant="h5" className="invoice-details__title" mb={2}>Invoice Details</Typography>

            <TableContainer component={Paper} className="invoice-details__table">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell >Invoice Number</TableCell>
                            <TableCell>{invoice.invoiceNumber}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date of Creation</TableCell>
                            <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>{invoice.totalAmount}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell>{invoice.status}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h5" className="invoice-details__line-items-title" mt={4} mb={2}>Line Items</Typography>
            <TableContainer component={Paper} className="invoice-details__line-items-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Tax</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoice.lineItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>{item.total}</TableCell>
                                <TableCell>{item.tax}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default InvoiceDetails;