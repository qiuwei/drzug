import { BaseEntity } from './../../shared';

export const enum ProductType {
    'SERVICE',
    'PRODUCT'
}

export class ProductMysuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public imageContentType?: string,
        public image?: any,
        public description?: any,
        public suggestedPrice?: number,
        public type?: ProductType,
        public sourceTaxId?: number,
        public providers?: BaseEntity[],
    ) {
    }
}
