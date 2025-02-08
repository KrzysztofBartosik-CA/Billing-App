import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, CircularProgress, Divider } from '@mui/material';
import { ChangeRequestResponse, Invoice } from '../types/interfaces';
import InvoiceDetailsTable from './InvoiceDetailsTable';
import { useTranslation } from '../hooks/useTranslation';

interface CompareInvoicesModalProps {
    open: boolean;
    onClose: () => void;
    request: ChangeRequestResponse | null;
}

const CompareInvoicesModal: React.FC<CompareInvoicesModalProps> = ({ open, onClose, request }) => {
    const [originalInvoice, setOriginalInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const { i18n } = useTranslation();

    useEffect(() => {
        const fetchOriginalInvoice = async () => {
            if (request) {
                setLoading(true);
                try {
                    const response = await fetch(`http://localhost:2000/invoices/${request.invoiceId}`, {
                        credentials: 'include',
                    });
                    const data = await response.json();
                    setOriginalInvoice(data);
                } catch (error) {
                    console.error('Error fetching original invoice:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchOriginalInvoice();
    }, [request]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...modalStyle }}>
                <Typography variant="h6" mb={2}>Compare Invoices</Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress />
                    </Box>
                ) : (
                    request && originalInvoice && (
                        <div>
                            <Typography variant="h4" mb={2}>{i18n('original_invoice')}</Typography>
                            <InvoiceDetailsTable invoice={originalInvoice} />
                            <Divider sx={{ my: 4 }} />
                            <Typography variant="h4" mb={2}>{i18n('updated_invoice')}</Typography>
                            <InvoiceDetailsTable invoice={request.updatedInvoice} />
                        </div>
                    )
                )}
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

export default CompareInvoicesModal;