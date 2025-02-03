import React from 'react';
import {TextField, IconButton, Box, Select, MenuItem} from '@mui/material';
import {Remove as RemoveIcon} from '@mui/icons-material';
import {useTranslation} from '../hooks/useTranslation';

interface LineItem {
    description: string;
    quantity: number;
    price: number;
    total: number;
    tax: number;
}

interface LineItemProps {
    item: LineItem;
    index: number;
    handleLineItemChange: (index: number, field: keyof LineItem, value: string | number) => void;
    handleRemoveLineItem: (index: number) => void;
}

const LineItemComponent: React.FC<LineItemProps> = ({item, index, handleLineItemChange, handleRemoveLineItem}) => {
    const {i18n} = useTranslation();

    return (
        <Box key={index} display="flex" alignItems="center" className="line-item-group" mb={2} gap={2}>
            <TextField
                label={i18n('description')}
                value={item.description}
                onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                className="line-item-group__input"
            />
            <TextField
                label={i18n('quantity')}
                type="number"
                value={item.quantity}
                onChange={(e) => handleLineItemChange(index, 'quantity', parseInt(e.target.value))}
                className="line-item-group__input"
            />
            <TextField
                label={i18n('price')}
                type="number"
                value={item.price}
                onChange={(e) => handleLineItemChange(index, 'price', parseFloat(e.target.value))}
                className="line-item-group__input"
            />
            <TextField
                label={i18n('total')}
                type="number"
                value={item.total.toFixed(2)}
                onChange={(e) => handleLineItemChange(index, 'total', parseFloat(e.target.value))}
                className="line-item-group__input"
            />
            <Select
                value={item.tax.toString()}
                onChange={(e) => handleLineItemChange(index, 'tax', parseFloat(e.target.value))}
                className="line-item-group__input"
            >
                <MenuItem value="0">{i18n('none')}</MenuItem>
                <MenuItem value="0.08">{i18n('eight_percent')}</MenuItem>
                <MenuItem value="0.23">{i18n('twenty_three_percent')}</MenuItem>
            </Select>
            {index > 0 && (
                <IconButton onClick={() => handleRemoveLineItem(index)} color="secondary">
                    <RemoveIcon/>
                </IconButton>
            )}
        </Box>
    );
};

export {LineItemComponent, LineItem};