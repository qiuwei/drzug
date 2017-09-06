
const enum PacketStatus {
    'NEW',
    'SENT',
    'ARRIVED'

};
export class PacketMysuffix {
    constructor(
        public id?: number,
        public weight?: number,
        public status?: PacketStatus,
        public destinationId?: number,
        public packetItemId?: number,
    ) {
    }
}
