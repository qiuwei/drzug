package es.qiu.drzug.service.mapper;

import es.qiu.drzug.domain.*;
import es.qiu.drzug.service.dto.PacketItemDTO;

import org.mapstruct.*;
import java.util.UUID;

/**
 * Mapper for the entity PacketItem and its DTO PacketItemDTO.
 */
@Mapper(componentModel = "spring", uses = {PacketMapper.class, })
public interface PacketItemMapper extends EntityMapper <PacketItemDTO, PacketItem> {

    @Mapping(source = "packet.id", target = "packetId")
    PacketItemDTO toDto(PacketItem packetItem); 

    @Mapping(source = "packetId", target = "packet")
    PacketItem toEntity(PacketItemDTO packetItemDTO); 
    default PacketItem fromId(UUID id) {
        if (id == null) {
            return null;
        }
        PacketItem packetItem = new PacketItem();
        packetItem.setId(id);
        return packetItem;
    }
}
