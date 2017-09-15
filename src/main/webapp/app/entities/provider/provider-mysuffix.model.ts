import { BaseEntity } from './../../shared';

export class ProviderMysuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public products?: BaseEntity[],
    ) {
    }
}
