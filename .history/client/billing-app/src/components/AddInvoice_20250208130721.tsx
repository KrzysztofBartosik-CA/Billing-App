import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Toast from './Toast';
import { useTranslation } from '../hooks/useTranslation';
import './scss/AddInvoice.scss';
import useAuth from "../hooks/useAuth";
import InvoiceForm from './InvoiceForm';
import { Invoice } from "../types/interfaces";

const AddInvoice = () => {
    const { i18n } = useTranslation();
    const { isAdmin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastOpen, setToastOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (invoice: Invoice) => {
        setLoading(true);

        try {
            const response = await fetch('http://localhost:2000/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invoice),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to add invoice');
            }

            setToastSeverity('success');
            setToastMessage(i18n('invoice_added_success'));
            setToastOpen(true);
            navigate('/invoices');
        } catch (error) {
            setToastSeverity('error');
            setToastMessage(i18n('error_adding_invoice'));
            setToastOpen(true);
        } finally {
            setLoading(false);
        }
    };

    if (!isAdmin) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h4" color="error">
                    {i18n('no_permission_to_add_invoices')}
                </Typography>
            </Box>
        );
    }

    return (
        <Box className="add-invoice">
            <Typography variant="h4" mb={4}>{i18n('add_invoice')}</Typography>
            <Box mb={4} display="flex" justifyContent="center">
                <InvoiceForm onSubmit={handleSubmit} loading={loading} />
            </Box>
            <Toast
                message={toastMessage}
                severity={toastSeverity}
                open={toastOpen}
                onClose={() => setToastOpen(false)}
            />
        </Box>
    );
};

export default AddInvoice;