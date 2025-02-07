import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, CircularProgress } from '@mui/material';
import { useTranslation } from '../hooks/useTranslation';

interface RefundConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (description: string) => void;
    loading: boolean; // New prop for loading state
}

const RefundConfirmationDialog: React.FC<RefundConfirmationDialogProps> = ({ open, onClose, onConfirm, loading }) => {
    const { i18n } = useTranslation();
    const [description, setDescription] = useState('');
    const [error, setError] = useState(''); // New state for error message

    const handleConfirm = () => {
        if (!description) {
            setError(i18n('description_required')); // Set error message if description is empty
            return;
        }
        onConfirm(description);
        setDescription('');
        setError('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{i18n('confirm_refund_request')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {i18n('refund_confirmation_msg')}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label={i18n('description')}
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading} // Disable input while loading
                    error={!!error} // Show error state if error message is set
                    helperText={error} // Show error message
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" disabled={loading}>
                    {i18n('cancel')}
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : i18n('confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RefundConfirmationDialog;