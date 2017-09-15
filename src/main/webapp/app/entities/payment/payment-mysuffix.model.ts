import { BaseEntity } from './../../shared';

export const enum Unit {
    'CNY',
    'EURO'
}

export class PaymentMysuffix implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public amount?: number,
        public unit?: Unit,
    ) {
    }
}
