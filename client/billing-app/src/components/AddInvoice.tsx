import React, {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {TextField, Button, Box, CircularProgress, Typography} from '@mui/material';
import {Add as AddIcon} from '@mui/icons-material';
import Toast from './Toast';
import {AuthContext} from '../context/AuthContext';
import {LineItemComponent, LineItem} from "./LineItemComponent";
import {useTranslation} from '../hooks/useTranslation';
import './scss/AddInvoice.scss';

const AddInvoice = () => {
    const {i18n} = useTranslation();
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
    const [lineItemsError, setLineItemsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastOpen, setToastOpen] = useState(false);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const calculateTotalAmount = () => {
            const sum = lineItems.reduce((sum, item) => sum + item.total, 0) || 0;
            return parseFloat(sum.toFixed(2));
        };
        setTotal(calculateTotalAmount());
    }, [lineItems]);

    const handleLineItemChange = (index: number, field: keyof LineItem, value: string | number) => {
        const newLineItems = [...lineItems];
        newLineItems[index] = {
            ...newLineItems[index],
            [field]: field === 'tax' ? parseFloat(value as string) : value
        };

        const taxRate = newLineItems[index].tax || 0;
        if (field === 'price' || field === 'quantity' || field === 'tax') {
            newLineItems[index].total = parseFloat((newLineItems[index].quantity * (newLineItems[index].price * taxRate + newLineItems[index].price)).toFixed(2));
        } else if (field === 'total') {
            newLineItems[index].price = parseFloat((newLineItems[index].total / (newLineItems[index].quantity * (1 + taxRate))).toFixed(2));
        }

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

        const hasEmptyFields = lineItems.some(item => !item.description || item.quantity <= 0 || item.price <= 0);
        setLineItemsError(hasEmptyFields);

        if (!date || hasEmptyFields) {
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
            setToastMessage(i18n('invoice_added_success'));
            setToastOpen(true);
            navigate('/invoices');
        } catch (error) {
            setToastSeverity('error');
            setToastMessage(i18n('error_adding_invoice'));
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
                    label={i18n('date_label')}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    error={dateError}
                    helperText={dateError ? i18n('date_required') : ''}
                    className="add-invoice-form__input"
                />
                <Typography variant="h6" mt={2}>
                    {i18n('total_amount_label')}: {total.toFixed(2)}
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
                    {i18n('add_line_item_button')}
                </Button>
            </Box>
            {lineItemsError && (
                <Typography color="error" variant="body2" mt={2}>
                    {i18n('all_fields_error')}
                </Typography>
            )}
            <Box className="add-invoice-form__actions" mt={2} mb={4}>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24}/> : i18n('add_invoice_button')}
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