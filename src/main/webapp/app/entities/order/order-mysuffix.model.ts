
const enum OrderStatus {
    'CANCELLED',
    'LOCKED',
    'COMPLETED',
    'NEW',
    'INQUIRY'

};
export class OrderMysuffix {
    constructor(
        public id?: number,
        public createdAt?: any,
        public status?: OrderStatus,
        public orderItemId?: number,
    ) {
    }
}
