import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from '../hooks/useTranslation';
import InvoiceForm from './InvoiceForm';
import { Invoice } from '../types/interfaces';

interface EditInvoiceModalProps {
    open: boolean;
    onClose: () => void;
    onAccept: () => void;
    invoice: Invoice;
}

const EditInvoiceModal: React.FC<EditInvoiceModalProps> = ({ open, onClose, invoice }) => {
    const { i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [invoiceData, setInvoiceData] = useState<Invoice>(invoice);

    useEffect(() => {
        setInvoiceData(invoice);
    }, [invoice]);

    const handleAccept = async (updatedInvoice: Invoice) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:2000/invoices/${invoice._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedInvoice),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to update invoice');
            }

            onClose();
        } catch (error) {
            console.error('Error updating invoice:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...modalStyle }}>
                <Typography variant="h6" mb={2}>{i18n('invoice_correction')}</Typography>
                <InvoiceForm invoice={invoiceData} setInvoiceData={setInvoiceData} onSubmit={handleAccept} loading={loading} />
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button onClick={onClose} variant="outlined" color="secondary" sx={{ mr: 2 }}>
                        {i18n('cancel')}
                    </Button>
                    <Button onClick={() => handleAccept(invoiceData)} variant="contained" color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : i18n('accept')}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default EditInvoiceModal;