
const enum Unit {
    'CNY',
    'EURO'

};
export class PaymentMysuffix {
    constructor(
        public id?: number,
        public date?: any,
        public amount?: number,
        public unit?: Unit,
    ) {
    }
}
