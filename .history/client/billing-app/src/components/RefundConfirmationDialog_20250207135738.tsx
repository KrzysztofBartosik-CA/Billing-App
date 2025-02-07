import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useTranslation } from '../hooks/useTranslation';

interface RefundConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const RefundConfirmationDialog: React.FC<RefundConfirmationDialogProps> = ({ open, onClose, onConfirm }) => {
    const { i18n } = useTranslation();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{i18n('confirm_refund_request')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {i18n('are_you_sure_you_want_to_request_a_full_refund_for_this_invoice')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {i18n('cancel')}
                </Button>
                <Button onClick={onConfirm} color="primary" autoFocus>
                    {i18n('confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RefundConfirmationDialog;