import { BaseEntity } from './../../shared';

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
        public orderItems?: BaseEntity[],
    ) {
    }
}
