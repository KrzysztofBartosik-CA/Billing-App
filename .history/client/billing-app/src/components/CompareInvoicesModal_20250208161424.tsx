import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, CircularProgress } from '@mui/material';
import { ChangeRequestResponse, Invoice } from '../types/interfaces';
import InvoiceDetailsTable from './InvoiceDetailsTable';

interface CompareInvoicesModalProps {
    open: boolean;
    onClose: () => void;
    request: ChangeRequestResponse | null;
}

const CompareInvoicesModal: React.FC<CompareInvoicesModalProps> = ({ open, onClose, request }) => {
    const [originalInvoice, setOriginalInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);

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
                            <Typography variant="h6" mb={2}>Original Invoice</Typography>
                            <InvoiceDetailsTable invoice={originalInvoice} />
                            <Typography variant="h6" mb={2} mt={4}>Updated Invoice</Typography>
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