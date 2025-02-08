import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { ChangeRequest, ChangeRequestResponse } from '../types/interfaces';
import CompareInvoicesModal from './CompareInvoicesModal';

const ChangeRequests = () => {
    const { i18n } = useTranslation();
    const [changeRequests, setChangeRequests] = useState<ChangeRequestResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [openCompareModal, setOpenCompareModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<ChangeRequestResponse | null>(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [confirmAction, setConfirmAction] = useState<() => void>(() => {});

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

    const handleOpenConfirmDialog = (action: () => void) => {
        setConfirmAction(() => action);
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
            <Typography variant="h4" mb={4} mt={12}>{i18n('change_requests')}</Typography>
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
                                        <Button onClick={() => handleOpenCompareModal(request)}>{i18n('compare')}</Button>
                                        <Button onClick={() => handleOpenConfirmDialog(() => handleAcceptRequest(request._id))}>{i18n('accept')}</Button>
                                        <Button onClick={() => handleOpenConfirmDialog(() => handleDiscardRequest(request._id))}>{i18n('discard')}</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <CompareInvoicesModal open={openCompareModal} onClose={handleCloseCompareModal} request={selectedRequest} />
            <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
                <DialogTitle>{i18n('confirm_action')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{i18n('are_you_sure')}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog} color="primary">
                        {i18n('cancel')}
                    </Button>
                    <Button onClick={() => { confirmAction(); handleCloseConfirmDialog(); }} color="primary">
                        {i18n('confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ChangeRequests;