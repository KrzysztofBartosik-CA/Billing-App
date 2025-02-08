import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { ChangeRequest, ChangeRequestResponse } from '../types/interfaces';

const ChangeRequests = () => {
    const { i18n } = useTranslation();
    const [changeRequests, setChangeRequests] = useState<ChangeRequestResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchChangeRequests = async () => {
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

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    const renderRow = (request: ChangeRequestResponse) => {
        return (
            <TableRow key={request._id}>
                <TableCell>
                    <Link to={`/invoice/${request.updatedInvoice._id}`}>
                        {request.updatedInvoice.invoiceNumber}
                    </Link>
                </TableCell>
                <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                <TableCell>{i18n(request.updatedInvoice.status)}</TableCell>
            </TableRow>
        )
    };

    return (
        <div className="change-requests">
            <Typography variant="h4" mb={4}>{i18n('change_requests')}</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{i18n('invoice_number')}</TableCell>
                            <TableCell>{i18n('request_date')}</TableCell>
                            <TableCell>{i18n('status')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {changeRequests.map(renderRow)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ChangeRequests;