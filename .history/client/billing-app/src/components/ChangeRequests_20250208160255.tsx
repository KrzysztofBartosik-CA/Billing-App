import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, CircularProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { ChangeRequest, ChangeRequestResponse } from '../types/interfaces';
import CompareInvoicesModal from './CompareInvoicesModal';
import ConfirmDialog from './ConfirmDialog';

const ChangeRequests = () => {
    const { i18n } = useTranslation();
    const [changeRequests, setChangeRequests] = useState<ChangeRequestResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [openCompareModal, setOpenCompareModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<ChangeRequestResponse | null>(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [confirmAction, setConfirmAction] = useState<() => void>(() => { });
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogMessage, setDialogMessage] = useState('');

    const fetchChangeRequests = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:2000/change-requests', {
                credentials: 'include',
            });
            const data = await response.json();
            setChangeRequests(data);
        } catch (error) {
            console.error('Error fetching change requests:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChangeRequests();
    }, []);

    const handleOpenCompareModal = (request: ChangeRequestResponse) => {
        setSelectedRequest(request);
        setOpenCompareModal(true);
    };

    const handleCloseCompareModal = () => {
        setOpenCompareModal(false);
        setSelectedRequest(null);
    };

    const handleOpenConfirmDialog = (action: () => void, title: string, message: string) => {
        setConfirmAction(() => action);
        setDialogTitle(title);
        setDialogMessage(message);
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };

    const handleAcceptRequest = async (requestId: string) => {
        try {
            const response = await fetch(`http://localhost:2000/change-requests/${requestId}/accept`, {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                fetchChangeRequests();
            } else {
                console.error('Error accepting change request');
            }
        } catch (error) {
            console.error('Error accepting change request:', error);
        }
    };

    const handleDiscardRequest = async (requestId: string) => {
        try {
            const response = await fetch(`http://localhost:2000/change-requests/${requestId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                fetchChangeRequests();
            } else {
                console.error('Error discarding change request');
            }
        } catch (error) {
            console.error('Error discarding change request:', error);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="change-requests">
            <Box display="flex" justifyContent="center" flexDirection="row" mt={12} ml={4} mr={4}>
                <Typography variant="h4" mb={4}>{i18n('change_requests')}</Typography>
                {changeRequests.length === 0 ? (
                    <Typography variant="h6" align="center">{i18n('no_change_requests')}</Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{i18n('invoice_number')}</TableCell>
                                    <TableCell>{i18n('request_date')}</TableCell>
                                    <TableCell>{i18n('status')}</TableCell>
                                    <TableCell>{i18n('actions')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {changeRequests.map((request) => (
                                    <TableRow key={request._id}>
                                        <TableCell>
                                            <Link to={`/invoice/${request.invoiceId}`}>
                                                {request.updatedInvoice.invoiceNumber}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{i18n(request.updatedInvoice.status)}</TableCell>
                                        <TableCell>
                                            <Box display="flex" gap={1}>
                                                <Button onClick={() => handleOpenCompareModal(request)}>{i18n('compare')}</Button>
                                                <Button variant="contained" color="success" onClick={() => handleOpenConfirmDialog(() => handleAcceptRequest(request._id), i18n('confirm_action'), i18n('are_you_sure_confirm'))}>{i18n('accept')}</Button>
                                                <Button variant="outlined" color="error" onClick={() => handleOpenConfirmDialog(() => handleDiscardRequest(request._id), i18n('discard_action'), i18n('are_you_sure_discard'))}>{i18n('discard')}</Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                )}
            </Box>
            <CompareInvoicesModal open={openCompareModal} onClose={handleCloseCompareModal} request={selectedRequest} />
            <ConfirmDialog open={openConfirmDialog} onClose={handleCloseConfirmDialog} onConfirm={() => { confirmAction(); handleCloseConfirmDialog(); }} title={dialogTitle} message={dialogMessage} />
        </div>
    );
};

export default ChangeRequests;