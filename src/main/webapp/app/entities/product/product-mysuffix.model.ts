
const enum ProductType {
    'SERVICE',
    'PRODUCT'

};
export class ProductMysuffix {
    constructor(
        public id?: number,
        public name?: string,
        public image?: any,
        public description?: any,
        public suggestedPrice?: number,
        public type?: ProductType,
        public sourceTaxId?: number,
        public providerId?: number,
    ) {
    }
}
