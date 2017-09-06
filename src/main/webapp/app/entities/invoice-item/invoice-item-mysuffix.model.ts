export class InvoiceItemMysuffix {
    constructor(
        public id?: number,
        public count?: number,
        public discount?: number,
        public invoiceId?: number,
        public productId?: number,
        public taxId?: number,
    ) {
    }
}
