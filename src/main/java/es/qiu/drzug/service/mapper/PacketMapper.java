package es.qiu.drzug.service.mapper;

import es.qiu.drzug.domain.*;
import es.qiu.drzug.service.dto.PacketDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Packet and its DTO PacketDTO.
 */
@Mapper(componentModel = "spring", uses = {StorageMapper.class, })
public interface PacketMapper extends EntityMapper <PacketDTO, Packet> {

    @Mapping(source = "destination.id", target = "destinationId")
    @Mapping(source = "destination.name", target = "destinationName")
    PacketDTO toDto(Packet packet); 

    @Mapping(source = "destinationId", target = "destination")
    @Mapping(target = "packetItems", ignore = true)
    Packet toEntity(PacketDTO packetDTO); 
    default Packet fromId(Long id) {
        if (id == null) {
            return null;
        }
        Packet packet = new Packet();
        packet.setId(id);
        return packet;
    }
}
