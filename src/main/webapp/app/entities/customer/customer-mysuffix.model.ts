import { BaseEntity } from './../../shared';

export class CustomerMysuffix implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public invoices?: BaseEntity[],
    ) {
    }
}
