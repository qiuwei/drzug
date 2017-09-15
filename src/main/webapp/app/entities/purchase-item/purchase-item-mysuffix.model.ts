import { BaseEntity } from './../../shared';

export class PurchaseItemMysuffix implements BaseEntity {
    constructor(
        public id?: number,
        public count?: number,
        public purchaseId?: number,
        public productId?: number,
    ) {
    }
}
