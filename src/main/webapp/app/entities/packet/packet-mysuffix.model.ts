import { BaseEntity } from './../../shared';

export const enum PacketStatus {
    'NEW',
    'SENT',
    'ARRIVED'
}

export class PacketMysuffix implements BaseEntity {
    constructor(
        public id?: number,
        public weight?: number,
        public status?: PacketStatus,
        public destinationId?: number,
        public packetItems?: BaseEntity[],
    ) {
    }
}
