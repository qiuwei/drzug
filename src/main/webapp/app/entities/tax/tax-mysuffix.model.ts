import { BaseEntity } from './../../shared';

export class TaxMysuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public rate?: number,
    ) {
    }
}
