import { BaseEntity } from './../../shared';

export const enum InvoiceStatus {
    'OPEN',
    'PAID'
}

export class InvoiceMysuffix implements BaseEntity {
    constructor(
        public id?: number,
        public createAt?: any,
        public status?: InvoiceStatus,
        public invoiceItems?: BaseEntity[],
        public customerId?: number,
    ) {
    }
}
