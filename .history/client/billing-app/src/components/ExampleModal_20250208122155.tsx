import React from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import { useTranslation } from '../hooks/useTranslation';

interface ExampleModalProps {
    open: boolean;
    onClose: () => void;
    onAccept: () => void;
}

const EditInvoiceModal: React.FC<ExampleModalProps> = ({ open, onClose, onAccept }) => {
    const { i18n } = useTranslation();

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...modalStyle }}>
                <Typography variant="h6" mb={2}>{i18n('example_modal_title')}</Typography>
                <Typography variant="body1" mb={2}>{i18n('example_modal_text')}</Typography>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button onClick={onClose} variant="outlined" color="secondary" sx={{ mr: 2 }}>
                        {i18n('cancel')}
                    </Button>
                    <Button onClick={onAccept} variant="contained" color="primary">
                        {i18n('accept')}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default EditInvoiceModal;