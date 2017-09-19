package es.qiu.drzug.service.mapper;

import es.qiu.drzug.domain.*;
import es.qiu.drzug.service.dto.StorageDTO;

import org.mapstruct.*;
import java.util.UUID;

/**
 * Mapper for the entity Storage and its DTO StorageDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface StorageMapper extends EntityMapper <StorageDTO, Storage> {
    
    
    default Storage fromId(UUID id) {
        if (id == null) {
            return null;
        }
        Storage storage = new Storage();
        storage.setId(id);
        return storage;
    }
}
