import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useTranslation } from '../hooks/useTranslation';

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, onClose, onConfirm }) => {
    const { i18n } = useTranslation();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{i18n('confirm_action')}</DialogTitle>
            <DialogContent>
                <DialogContentText>{i18n('are_you_sure')}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {i18n('cancel')}
                </Button>
                <Button onClick={onConfirm} color="primary">
                    {i18n('confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;