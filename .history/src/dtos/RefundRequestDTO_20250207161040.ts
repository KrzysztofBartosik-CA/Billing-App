import {User} from '../types/userTypes';
import {Invoice} from '../types/invoiceTypes';

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