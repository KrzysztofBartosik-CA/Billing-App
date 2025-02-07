import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { RefundRequest } from '../types/interfaces';

const RefundRequests: React.FC = () => {
    const { i18n } = useTranslation();
    const [refundRequests, setRefundRequests] = useState<RefundRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null); // New state for action loading

    const fetchRefundRequests = async () => {
        try {
            const response = await fetch('http://localhost:2000/refunds', {
                credentials: 'include',
            });
            const data = await response.json();
            setRefundRequests(data);
        } catch (error) {
            console.error('Error fetching refund requests:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRefundRequests();
    }, []);

    const handleAccept = async (id: string) => {
        setActionLoading(id); // Set loading state
        try {
            await fetch(`http://localhost:2000/refunds/${id}/accept`, {
                method: 'POST',
                credentials: 'include',
            });
            fetchRefundRequests(); // Refresh the list
        } catch (error) {
            console.error('Error accepting refund request:', error);
        } finally {
            setActionLoading(null); // Reset loading state
        }
    };

    const handleDiscard = async (id: string) => {
        setActionLoading(id); // Set loading state
        try {
            await fetch(`http://localhost:2000/refunds/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            fetchRefundRequests(); // Refresh the list
        } catch (error) {
            console.error('Error discarding refund request:', error);
        } finally {
            setActionLoading(null); // Reset loading state
        }
    };

    const renderRefundRequestRow = (request: RefundRequest) => {
        let invoiceLink; 
        if (request.invoice) {
            invoiceLink = <Link to={`/invoice/${request.invoice._id}`}>
                {request.invoice.invoiceNumber}
            </Link>;
        } else {
            invoiceLink = i18n('invoice_deleted')
        };

        return (
            <TableRow key={request.id}>
                <TableCell>{request.user ? request.user.username : i18n('user_deleted')}</TableCell>
                <TableCell>
                    {invoiceLink}
                </TableCell>
                <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAccept(request.id)}
                        disabled={actionLoading === request.id}
                    >
                        {actionLoading === request.id ? <CircularProgress size={24} /> : i18n('accept')}
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDiscard(request.id)}
                        style={{ marginLeft: '8px' }}
                        disabled={actionLoading === request.id}
                    >
                        {actionLoading === request.id ? <CircularProgress size={24} /> : i18n('discard')}
                    </Button>
                </TableCell>
            </TableRow>
        )
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="flex-start" height="100vh" px={4} mt={12}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{i18n('username')}</TableCell>
                            <TableCell>{i18n('invoice')}</TableCell>
                            <TableCell>{i18n('date_of_creation')}</TableCell>
                            <TableCell>{i18n('reason')}</TableCell>
                            <TableCell>{i18n('actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {refundRequests.map(renderRefundRequestRow)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default RefundRequests;