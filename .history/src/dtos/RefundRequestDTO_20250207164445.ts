import {User} from '../types/userTypes';
import {Invoice} from '../types/invoiceTypes';

export class RefundRequestDTO {
    id: string;
    user: User;
    invoice: Invoice;
    reason: string;
    requestDate: Date;

    constructor(id: string, user: User, invoice: Invoice, reason: string, requestDate: Date) {
        this.id = id;
        this.user = user;
        this.invoice = invoice;
        this.reason = reason;
        this.requestDate = requestDate;
    }
}