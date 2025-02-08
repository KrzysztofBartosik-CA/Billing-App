export interface LineItem {
    description: string;
    quantity: number;
    price: number;
    total: number;
    tax: number;
}

export interface Invoice {
    _id: string;
    userId: string;
    invoiceNumber: string;
    date: string;
    totalAmount: number;
    status: 'paid' | 'unpaid' | 'pending';
    lineItems: LineItem[];
}

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    role: "admin" | "user";
}

export interface RefundRequest {
    id: string;
    user: User| null;
    invoice: Invoice;
    reason: string;
    requestDate: string;
    status: string;
}

export interface ChangeRequest {
    invoiceId: string;
    updatedInvoice: Invoice;
    requestDate: string;
}

export interface ChangeRequestResponse extends ChangeRequest {
    _id: string;
}