package es.qiu.drzug.service.mapper;

import es.qiu.drzug.domain.*;
import es.qiu.drzug.service.dto.TaxDTO;

import org.mapstruct.*;
import java.util.UUID;

/**
 * Mapper for the entity Tax and its DTO TaxDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TaxMapper extends EntityMapper <TaxDTO, Tax> {
    
    
    default Tax fromId(UUID id) {
        if (id == null) {
            return null;
        }
        Tax tax = new Tax();
        tax.setId(id);
        return tax;
    }
}
