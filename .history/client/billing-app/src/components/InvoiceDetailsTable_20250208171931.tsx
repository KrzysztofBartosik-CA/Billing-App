import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Invoice } from '../types/interfaces';
import { useTranslation } from '../hooks/useTranslation';

interface InvoiceDetailsTableProps {
    invoice: Invoice;
}

const InvoiceDetailsTable: React.FC<InvoiceDetailsTableProps> = ({ invoice }) => {
    const { i18n } = useTranslation();

    return (
        <div>
            <TableContainer component={Paper} className="invoice-details__table">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>{i18n('invoice_number')}</TableCell>
                            <TableCell>{invoice.invoiceNumber}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{i18n('date_of_creation')}</TableCell>
                            <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{i18n('total_amount')}</TableCell>
                            <TableCell>{`${invoice.totalAmount} $`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{i18n('status')}</TableCell>
                            <TableCell>{i18n(invoice.status)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h6" className="invoice-details__line-items-title" mt={4} mb={2}>{i18n('line_items')}</Typography>
            <TableContainer component={Paper} className="invoice-details__line-items-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{i18n('description')}</TableCell>
                            <TableCell>{i18n('quantity')}</TableCell>
                            <TableCell>{i18n('price')}</TableCell>
                            <TableCell>{i18n('price_incl_tax')}</TableCell>
                            <TableCell>{i18n('total')}</TableCell>
                            <TableCell>{i18n('tax')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoice.lineItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{`${item.price.toFixed(2)} $`}</TableCell>
                                <TableCell>{`${(item.price + item.price * item.tax).toFixed(2)} $`}</TableCell>
                                <TableCell>{`${item.total} $`}</TableCell>
                                <TableCell>{(item.tax * 100).toFixed(2)}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default InvoiceDetailsTable;