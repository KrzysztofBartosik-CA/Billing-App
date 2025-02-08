import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, TextField, CircularProgress, Typography } from '@mui/material';
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
                <Box justifyContent="center" display="flex" alignItems="center" flexDirection="column">
                    <img width={500} height={500} src="/assets/copilot_BLIK.png" alt="Copilot pays BLIK" className="payment__image" style={{ marginBottom: '16px', borderRadius: '10px' }} />
                    <Typography variant="body2" color="error" align="center" style={{ marginTop: '16px' }}>
                        {i18n('dont_trust_suspicious_websites')}
                    </Typography>
                </Box>
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
                <Box p={2} display="flex" justifyContent="flex-end" width="100%">
                    <Button onClick={onClose} color="primary">
                        {i18n('cancel')}
                    </Button>
                    <Button onClick={handleConfirm} variant='contained' color="success" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : i18n('pay')}
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default PaymentDialog;