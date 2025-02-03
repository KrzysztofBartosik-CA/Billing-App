import React, {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {TextField, Button, Box, CircularProgress, Typography} from '@mui/material';
import {Add as AddIcon} from '@mui/icons-material';
import Toast from './Toast';
import {AuthContext} from '../context/AuthContext';
import {LineItemComponent, LineItem} from "./LineItemComponent";
import './scss/AddInvoice.scss';

const AddInvoice = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const [date, setDate] = useState('');
    const [lineItems, setLineItems] = useState<LineItem[]>([{
        description: '',
        quantity: 0,
        price: 0,
        total: 0,
        tax: 0
    }]);
    const [dateError, setDateError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastOpen, setToastOpen] = useState(false);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const calculateTotalAmount = () => {
            return lineItems.reduce((sum, item) => sum + item.total, 0);
        };
        setTotal(calculateTotalAmount());
    }, [lineItems]);

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

    const createInvoicePayload = () => {
        const payload = {
            userId: user?.id,
            date,
            totalAmount: total,
            lineItems,
        }
        return JSON.stringify(payload);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDateError(!date);

        if (!date) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:2000/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: createInvoicePayload(),
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
            flexDirection="column"
            justifyContent="flex-start"
        >
            <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2} mt={12}>
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
                <Typography variant="h6" mt={2}>
                    Total amount: {total}
                </Typography>
            </Box>
            <Box className="add-invoice-form__line-items">
                {lineItems.map((item, index) => (
                    <LineItemComponent
                        key={index}
                        item={item}
                        index={index}
                        handleLineItemChange={handleLineItemChange}
                        handleRemoveLineItem={handleRemoveLineItem}
                    />
                ))}
                <Button onClick={handleAddLineItem} variant="outlined" color="primary" startIcon={<AddIcon/>}>
                    Add Line Item
                </Button>
            </Box>
            <Box className="add-invoice-form__actions" mt={2} mb={4}>
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