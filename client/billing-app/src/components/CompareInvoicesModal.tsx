import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { ChangeRequestResponse } from '../types/interfaces';

interface CompareInvoicesModalProps {
    open: boolean;
    onClose: () => void;
    request: ChangeRequestResponse | null;
}

const CompareInvoicesModal: React.FC<CompareInvoicesModalProps> = ({ open, onClose, request }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...modalStyle }}>
                <Typography variant="h6" mb={2}>Compare Invoices</Typography>
                {/* Add comparison logic here */}
                {request && (
                    <div>
                        <Typography variant="body1">Original Invoice: {request.invoiceId}</Typography>
                        <Typography variant="body1">Updated Invoice: {request.updatedInvoice.invoiceNumber}</Typography>
                    </div>
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