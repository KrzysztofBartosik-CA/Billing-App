import User from '../models/User';
import Invoice from '../models/Invoice';

export class RefundRequestDTO {
    user: User;
    invoice: Invoice;
    reason: string;
    requestDate: Date;

    constructor(user: User, invoice: Invoice, reason: string, requestDate: Date) {
        this.user = user;
        this.invoice = invoice;
        this.reason = reason;
        this.requestDate = requestDate;
    }
}