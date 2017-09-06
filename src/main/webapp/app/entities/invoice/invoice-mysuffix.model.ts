
const enum InvoiceStatus {
    'OPEN',
    'PAID'

};
export class InvoiceMysuffix {
    constructor(
        public id?: number,
        public createAt?: any,
        public status?: InvoiceStatus,
        public invoiceItemId?: number,
        public customerId?: number,
    ) {
    }
}
