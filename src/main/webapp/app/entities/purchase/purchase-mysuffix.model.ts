import { BaseEntity } from './../../shared';

export class PurchaseMysuffix implements BaseEntity {
    constructor(
        public id?: number,
        public createdAt?: any,
        public purchaseItems?: BaseEntity[],
    ) {
    }
}
