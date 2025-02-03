import React from 'react';
import { useParams } from 'react-router-dom';
import './scss/InvoiceDetails.scss';

const InvoiceDetails = () => {
    const { id } = useParams();
    const invoice = {
        id,
        number: 'INV-001',
        date: '2023-01-01',
        total: 100.00,
        // Add more attributes as needed
    };

    return (
        <div className="invoice-details">
            <h2 className="invoice-details__title">Invoice Details</h2>
            <table className="invoice-details__table">
                <tbody>
                    <tr>
                        <td>Invoice Number</td>
                        <td>{invoice.number}</td>
                    </tr>
                    <tr>
                        <td>Date of Creation</td>
                        <td>{invoice.date}</td>
                    </tr>
                    <tr>
                        <td>Total Amount</td>
                        <td>{invoice.total}</td>
                    </tr>
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceDetails;