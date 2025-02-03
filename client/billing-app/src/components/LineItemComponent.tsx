import React from 'react';
    import { TextField, IconButton, Box, Select, MenuItem } from '@mui/material';
    import { Remove as RemoveIcon } from '@mui/icons-material';

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

    const LineItemComponent: React.FC<LineItemProps> = ({ item, index, handleLineItemChange, handleRemoveLineItem }) => {
        return (
            <Box key={index} display="flex" alignItems="center" className="line-item-group" mb={2} gap={2}>
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
                    value={item.total.toFixed(2)}
                    onChange={(e) => handleLineItemChange(index, 'total', parseFloat(e.target.value))}
                    className="line-item-group__input"
                />
                <Select
                    value={item.tax.toString()}
                    onChange={(e) => handleLineItemChange(index, 'tax', parseFloat(e.target.value))}
                    className="line-item-group__input"
                >
                    <MenuItem value="0">None</MenuItem>
                    <MenuItem value="0.08">8%</MenuItem>
                    <MenuItem value="0.23">23%</MenuItem>
                </Select>
                {index > 0 && (
                    <IconButton onClick={() => handleRemoveLineItem(index)} color="secondary">
                        <RemoveIcon />
                    </IconButton>
                )}
            </Box>
        );
    };

    export { LineItemComponent, LineItem };