import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import { Invoice } from '../types/interfaces';
import { useTranslation } from '../hooks/useTranslation';
import EditInvoiceModal from './EditInvoiceModal';
import './scss/InvoiceDetails.scss';

const InvoiceDetails = () => {
    const { id } = useParams();
    const { i18n } = useTranslation();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // Use useNavigate hook

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

    useEffect(() => {
        fetchInvoice();
    }, [id]);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAcceptModal = async () => {
        await fetchInvoice();
        setShowModal(false);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!invoice) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h4" style={{ opacity: 0.5 }}>{i18n('invoice_not_found')}</Typography>
            </Box>
        );
    }

    return (
        <div className="invoice-details">
            <Box display="flex" alignItems="center" mb={2} mt={12}>
                <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
                    {i18n('back')}
                </Button>
            </Box>

            <Typography variant="h5" className="invoice-details__title" mb={2}>{i18n('invoice_details')}</Typography>

            <TableContainer component={Paper} className="invoice-details__table">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>{i18n('invoice_number')}</TableCell>
                            <TableCell>{invoice.invoiceNumber}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{i18n('date_of_creation')}</TableCell>
                            <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{i18n('total_amount')}</TableCell>
                            <TableCell>{`${invoice.totalAmount} $`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{i18n('status')}</TableCell>
                            <TableCell>{i18n(invoice.status)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h5" className="invoice-details__line-items-title" mt={4} mb={2}>{i18n('line_items')}</Typography>
            <TableContainer component={Paper} className="invoice-details__line-items-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{i18n('description')}</TableCell>
                            <TableCell>{i18n('quantity')}</TableCell>
                            <TableCell>{i18n('price')}</TableCell>
                            <TableCell>{i18n('price_incl_tax')}</TableCell>
                            <TableCell>{i18n('total')}</TableCell>
                            <TableCell>{i18n('tax')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoice.lineItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{`${item.price.toFixed(2)} $`}</TableCell>
                                <TableCell>{`${(item.price + item.price * item.tax).toFixed(2)} $`}</TableCell>
                                <TableCell>{`${item.total} $`}</TableCell>
                                <TableCell>{(item.tax * 100).toFixed(2)}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box display="flex" justifyContent="flex-end" mt={4}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleShowModal}
                    disabled={invoice.status === 'pending'}
                >
                    {i18n('invoice_correction')}
                </Button>
            </Box>

            <EditInvoiceModal invoice={invoice} open={showModal} onClose={handleCloseModal} onAccept={handleAcceptModal} />
        </div>
    );
};

export default InvoiceDetails;