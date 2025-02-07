export interface Invoice {
    _id: string;
    userId: string;
    invoiceNumber: string;
    date: Date;
    totalAmount: number;
    lineItems: LineItem[];
    status: 'paid' | 'unpaid' | 'pending';
}

export interface LineItem {
    description: string;
    quantity: number;
    price: number;
    total: number;
    tax: number;
}