import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@mui/material';
import {useTranslation} from '../hooks/useTranslation';

interface RemovalConfirmationProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const RemovalConfirmation: React.FC<RemovalConfirmationProps> = ({open, onClose, onConfirm}) => {
    const {i18n} = useTranslation();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{i18n('confirm_deletion')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {i18n('delete_invoice_confirmation')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {i18n('cancel')}
                </Button>
                <Button onClick={onConfirm} color="secondary">
                    {i18n('delete')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RemovalConfirmation;