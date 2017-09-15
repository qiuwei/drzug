package es.qiu.drzug.service.mapper;

import es.qiu.drzug.domain.*;
import es.qiu.drzug.service.dto.TaxDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Tax and its DTO TaxDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TaxMapper extends EntityMapper <TaxDTO, Tax> {
    
    
    default Tax fromId(Long id) {
        if (id == null) {
            return null;
        }
        Tax tax = new Tax();
        tax.setId(id);
        return tax;
    }
}
