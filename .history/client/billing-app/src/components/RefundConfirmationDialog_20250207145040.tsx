import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import { useTranslation } from '../hooks/useTranslation';

interface RefundConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (description: string) => void; // Updated to accept a description parameter
}

const RefundConfirmationDialog: React.FC<RefundConfirmationDialogProps> = ({ open, onClose, onConfirm }) => {
    const { i18n } = useTranslation();
    const [description, setDescription] = useState('');

    const handleConfirm = () => {
        onConfirm(description);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{i18n('confirm_refund_request')}</DialogTitle>
            <DialogContent>
                <DialogContentText mb={4}>
                    {i18n('refund_confirmation_msg')}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {i18n('cancel')}
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    {i18n('confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RefundConfirmationDialog;