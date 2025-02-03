// client/billing-app/src/components/Invoices.tsx
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
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
    IconButton,
    CircularProgress
} from '@mui/material';
import {Delete as DeleteIcon} from '@mui/icons-material';
import RemovalConfirmation from './RemovalConfirmation';
import './scss/Invoices.scss';

interface Invoice {
    _id: string;
    invoiceNumber: string;
    date: string;
    totalAmount: number;
    status: 'paid' | 'unpaid' | 'pending';
}

const Invoices = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

    const fetchInvoices = async () => {
        try {
            const response = await fetch('http://localhost:2000/invoices', {
                credentials: 'include',
            });
            const data = await response.json();
            setInvoices(data);
        } catch (error) {
            console.error('Error fetching invoices:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleDeleteClick = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedInvoice(null);
    };

    const handleDeleteConfirm = async () => {
        if (selectedInvoice) {
            try {
                await fetch(`http://localhost:2000/invoices/${selectedInvoice._id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });
                fetchInvoices();
            } catch (error) {
                console.error('Error deleting invoice:', error);
            } finally {
                handleClose();
            }
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress/>
            </Box>
        );
    }

    if (invoices.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h4" style={{opacity: 0.5}}>No invoices available</Typography>
            </Box>
        );
    }

    return (
        <>
            <TableContainer component={Paper} className="invoices">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Invoice Number</TableCell>
                            <TableCell>Date of Creation</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice._id}>
                                <TableCell>
                                    <Link to={`/invoice/${invoice._id}`} className="invoices__link">
                                        {invoice.invoiceNumber}
                                    </Link>
                                </TableCell>
                                <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                                <TableCell>{invoice.totalAmount}</TableCell>
                                <TableCell>{invoice.status}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteClick(invoice)} color="secondary">
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <RemovalConfirmation
                open={open}
                onClose={handleClose}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default Invoices;