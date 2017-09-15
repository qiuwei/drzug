import { BaseEntity } from './../../shared';

export class OrderItemMysuffix implements BaseEntity {
    constructor(
        public id?: number,
        public count?: number,
        public salePrice?: number,
        public productId?: number,
        public orderId?: number,
    ) {
    }
}
