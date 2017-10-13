import { BaseEntity } from './../../shared';
import { OrderItemMysuffix } from "../order-item/order-item-mysuffix.model";

export const enum OrderStatus {
    'CANCELLED',
    'LOCKED',
    'COMPLETED',
    'NEW',
    'INQUIRY'
}

export class OrderMysuffix implements BaseEntity {
    constructor(
        public id?: number,
        public createdAt?: any,
        public status?: OrderStatus,
        public orderItems?: OrderItemMysuffix[],
    ) {
    }
}
