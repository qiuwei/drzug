package es.qiu.drzug.service.mapper;

import es.qiu.drzug.domain.*;
import es.qiu.drzug.service.dto.ProviderDTO;

import org.mapstruct.*;
import java.util.UUID;

/**
 * Mapper for the entity Provider and its DTO ProviderDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProviderMapper extends EntityMapper <ProviderDTO, Provider> {
    
    @Mapping(target = "products", ignore = true)
    Provider toEntity(ProviderDTO providerDTO); 
    default Provider fromId(UUID id) {
        if (id == null) {
            return null;
        }
        Provider provider = new Provider();
        provider.setId(id);
        return provider;
    }
}
