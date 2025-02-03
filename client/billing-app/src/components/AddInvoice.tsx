import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {TextField, Button, Box, CircularProgress, IconButton} from '@mui/material';
import {Add as AddIcon, Remove as RemoveIcon} from '@mui/icons-material';
import Toast from './Toast';
import './scss/AddInvoice.scss';

interface LineItem {
    description: string;
    quantity: number;
    price: number;
    total: number;
    tax: number;
}

const AddInvoice = () => {
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [date, setDate] = useState('');
    const [total, setTotal] = useState('');
    const [lineItems, setLineItems] = useState<LineItem[]>([{
        description: '',
        quantity: 0,
        price: 0,
        total: 0,
        tax: 0
    }]);
    const [invoiceNumberError, setInvoiceNumberError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [totalError, setTotalError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastOpen, setToastOpen] = useState(false);
    const navigate = useNavigate();

    const handleLineItemChange = (index: number, field: keyof LineItem, value: string | number) => {
        const newLineItems = [...lineItems];
        newLineItems[index] = {
            ...newLineItems[index],
            [field]: value,
            total: newLineItems[index].quantity * newLineItems[index].price,
            tax: newLineItems[index].quantity * newLineItems[index].price * 0.1 // Assuming 10% tax
        };
        setLineItems(newLineItems);
    };

    const handleAddLineItem = () => {
        setLineItems([...lineItems, {description: '', quantity: 0, price: 0, total: 0, tax: 0}]);
    };

    const handleRemoveLineItem = (index: number) => {
        const newLineItems = lineItems.filter((_, i) => i !== index);
        setLineItems(newLineItems);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInvoiceNumberError(!invoiceNumber);
        setDateError(!date);
        setTotalError(!total);

        if (!invoiceNumber || !date || !total) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:2000/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    invoiceNumber,
                    date,
                    totalAmount: parseFloat(total),
                    lineItems,
                }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to add invoice');
            }

            setToastSeverity('success');
            setToastMessage('Invoice added successfully');
            setToastOpen(true);
            navigate('/invoices');
        } catch (error) {
            setToastSeverity('error');
            setToastMessage('Error adding invoice');
            setToastOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="add-invoice-form"
            display="flex"
        >
            <Box flex={1} className="add-invoice-form__left">
                <TextField
                    label="Invoice Number"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    error={invoiceNumberError}
                    helperText={invoiceNumberError ? 'Invoice number is required' : ''}
                    className="add-invoice-form__input"
                />
                <TextField
                    label="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    error={dateError}
                    helperText={dateError ? 'Date is required' : ''}
                    className="add-invoice-form__input"
                    InputLabelProps={{shrink: true}}
                />
                <TextField
                    label="Total Amount"
                    type="number"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    error={totalError}
                    helperText={totalError ? 'Total amount is required' : ''}
                    className="add-invoice-form__input"
                />
            </Box>
            <Box flex={1} className="add-invoice-form__right">
                {lineItems.map((item, index) => (
                    <Box key={index} display="flex" alignItems="center" className="line-item-group">
                        <TextField
                            label="Description"
                            value={item.description}
                            onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                            className="line-item-group__input"
                        />
                        <TextField
                            label="Quantity"
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleLineItemChange(index, 'quantity', parseInt(e.target.value))}
                            className="line-item-group__input"
                        />
                        <TextField
                            label="Price"
                            type="number"
                            value={item.price}
                            onChange={(e) => handleLineItemChange(index, 'price', parseFloat(e.target.value))}
                            className="line-item-group__input"
                        />
                        <TextField
                            label="Total"
                            type="number"
                            value={item.total}
                            onChange={(e) => handleLineItemChange(index, 'total', parseFloat(e.target.value))}
                            className="line-item-group__input"
                        />
                        <TextField
                            label="Tax"
                            type="number"
                            value={item.tax}
                            onChange={(e) => handleLineItemChange(index, 'tax', parseFloat(e.target.value))}
                            className="line-item-group__input"
                        />
                        {index > 0 && (
                            <IconButton onClick={() => handleRemoveLineItem(index)} color="secondary">
                                <RemoveIcon/>
                            </IconButton>
                        )}
                    </Box>
                ))}
                <Button onClick={handleAddLineItem} variant="contained" color="primary" startIcon={<AddIcon/>}>
                    Add Line Item
                </Button>
            </Box>
            <Box className="add-invoice-form__actions">
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24}/> : 'Add Invoice'}
                </Button>
            </Box>
            <Toast
                message={toastMessage}
                severity={toastSeverity}
                open={toastOpen}
                onClose={() => setToastOpen(false)}
            />
        </Box>
    );
};

export default AddInvoice;