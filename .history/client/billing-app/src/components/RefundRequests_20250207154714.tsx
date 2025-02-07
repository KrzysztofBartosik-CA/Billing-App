import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from '../hooks/useTranslation';

interface RefundRequest {
    _id: string;
    userId: string;
    invoiceId: string;
    requestDate: string;
    status: string;
    reason: string;
}

const RefundRequests: React.FC = () => {
    const { i18n } = useTranslation();
    const [refundRequests, setRefundRequests] = useState<RefundRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRefundRequests = async () => {
        try {
            const response = await fetch('http://localhost:2000/refund-requests', {
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
        // Implement accept logic here
    };

    const handleDiscard = async (id: string) => {
        // Implement discard logic here
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
                            <TableCell>{i18n('user')}</TableCell>
                            <TableCell>{i18n('invoice_id')}</TableCell>
                            <TableCell>{i18n('date_of_creation')}</TableCell>
                            <TableCell>{i18n('actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {refundRequests.map((request) => (
                            <TableRow key={request._id}>
                                <TableCell>{request.userId}</TableCell>
                                <TableCell>{request.invoiceId}</TableCell>
                                <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleAccept(request._id)}>
                                        {i18n('accept')}
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDiscard(request._id)} style={{ marginLeft: '8px' }}>
                                        {i18n('discard')}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default RefundRequests;