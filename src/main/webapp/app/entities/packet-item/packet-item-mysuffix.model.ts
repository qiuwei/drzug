import { BaseEntity } from './../../shared';

export class PacketItemMysuffix implements BaseEntity {
    constructor(
        public id?: number,
        public count?: number,
        public packetId?: number,
    ) {
    }
}
