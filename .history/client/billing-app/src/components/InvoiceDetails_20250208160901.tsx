import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, CircularProgress, Button } from '@mui/material';
import { Invoice } from '../types/interfaces';
import { useTranslation } from '../hooks/useTranslation';
import EditInvoiceModal from './EditInvoiceModal';
import InvoiceDetailsTable from './InvoiceDetailsTable';
import './scss/InvoiceDetails.scss';

const InvoiceDetails = () => {
    const { id } = useParams();
    const { i18n } = useTranslation();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // Use useNavigate hook

    const fetchInvoice = async () => {
        setLoading(true);
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

            <InvoiceDetailsTable invoice={invoice} />

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