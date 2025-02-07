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
    CircularProgress,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import {Delete as DeleteIcon} from '@mui/icons-material';
import {Invoice} from '../types/interfaces';
import RemovalConfirmation from './RemovalConfirmation';
import {useTranslation} from '../hooks/useTranslation';
import useAuth from '../hooks/useAuth';
import './scss/Invoices.scss';

const Invoices = () => {
    const {i18n} = useTranslation();
    const {isAdmin} = useAuth();
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [totalUnpaidAmount, setTotalUnpaidAmount] = useState(0);
    const [refundDialogOpen, setRefundDialogOpen] = useState(false);
    const [refundInvoice, setRefundInvoice] = useState<Invoice | null>(null);

    const calculateUnpaidAmount = (data: Invoice[]) => {
        return data.filter((invoice: Invoice) => invoice.status === 'unpaid')
            .reduce((sum: number, invoice: Invoice) => sum + invoice.totalAmount, 0);
    }

    const fetchInvoices = async () => {
        try {
            const response = await fetch('http://localhost:2000/invoices', {
                credentials: 'include',
            });
            const data = await response.json();
            setInvoices(data);
            const unpaidAmount = calculateUnpaidAmount(data);
            setTotalUnpaidAmount(unpaidAmount);
        } catch (error) {
            console.error('Error fetching invoices:', error);
            setInvoices([]);
            setTotalUnpaidAmount(0);
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

    const handleRefundClick = (invoice: Invoice) => {
        setRefundInvoice(invoice);
        setRefundDialogOpen(true);
    };

    const handleRefundClose = () => {
        setRefundDialogOpen(false);
        setRefundInvoice(null);
    };

    const handleRefundConfirm = async () => {
        if (refundInvoice) {
            try {
                await fetch(`http://localhost:2000/invoices/${refundInvoice._id}/refund`, {
                    method: 'POST',
                    credentials: 'include',
                });
                fetchInvoices();
            } catch (error) {
                console.error('Error requesting refund:', error);
            } finally {
                handleRefundClose();
            }
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'green';
            case 'unpaid':
                return 'red';
            case 'pending':
                return 'blue';
            default:
                return 'black';
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
                <Typography variant="h4" style={{opacity: 0.5}}>{i18n('no_invoices_available')}</Typography>
            </Box>
        );
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="flex-start" height="100vh" px={4} mt={12}>
            <TableContainer component={Paper} className="invoices">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{i18n('invoice_number')}</TableCell>
                            <TableCell align="right">{i18n('date_of_creation')}</TableCell>
                            <TableCell align="right">{i18n('total_amount')}</TableCell>
                            <TableCell>{i18n('status')}</TableCell>
                            <TableCell>{i18n('actions')}</TableCell>
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
                                <TableCell align="right">{new Date(invoice.date).toLocaleDateString()}</TableCell>
                                <TableCell align="right">{`${invoice.totalAmount} $`}</TableCell>
                                <TableCell style={{color: getStatusColor(invoice.status)}}>
                                    {i18n(invoice.status)}
                                </TableCell>
                                <TableCell>
                                    {isAdmin ? (
                                        <IconButton onClick={() => handleDeleteClick(invoice)} color="error">
                                            <DeleteIcon/>
                                        </IconButton>
                                    ) : (
                                        <Button variant="contained" color="primary" onClick={() => handleRefundClick(invoice)}>
                                            {i18n('request_full_refund')}
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box p={2}>
                    <Typography variant="h6">
                        {i18n('total_unpaid_amount')}: {totalUnpaidAmount.toFixed(2)} $
                    </Typography>
                </Box>
            </TableContainer>
            <RemovalConfirmation
                open={open}
                onClose={handleClose}
                onConfirm={handleDeleteConfirm}
            />
            <Dialog
                open={refundDialogOpen}
                onClose={handleRefundClose}
            >
                <DialogTitle>{i18n('confirm_refund_request')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {i18n('are_you_sure_you_want_to_request_a_full_refund_for_this_invoice')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRefundClose} color="primary">
                        {i18n('cancel')}
                    </Button>
                    <Button onClick={handleRefundConfirm} color="primary" autoFocus>
                        {i18n('confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Invoices;