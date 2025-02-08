import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, CircularProgress } from '@mui/material';
import { useTranslation } from '../hooks/useTranslation';

interface PaymentDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (paymentDetails: string) => void;
    loading: boolean;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ open, onClose, onConfirm, loading }) => {
    const { i18n } = useTranslation();
    const [paymentDetails, setPaymentDetails] = useState('');

    const handleConfirm = () => {
        onConfirm(paymentDetails);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{i18n('payment')}</DialogTitle>
            <DialogContent>
                <img width={500} height={500} src="/assets/copilot_BLIK.png" alt="Copilot pays BLIK" className="payment__image" style={{ marginBottom: '16px' }} />
                <TextField
                    autoFocus
                    margin="dense"
                    label={'BLIK'}
                    type="text"
                    fullWidth
                    value={paymentDetails}
                    onChange={(e) => setPaymentDetails(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {i18n('cancel')}
                </Button>
                <Button onClick={handleConfirm} color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : i18n('confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PaymentDialog;