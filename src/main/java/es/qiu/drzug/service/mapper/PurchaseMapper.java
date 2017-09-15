package es.qiu.drzug.service.mapper;

import es.qiu.drzug.domain.*;
import es.qiu.drzug.service.dto.PurchaseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Purchase and its DTO PurchaseDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PurchaseMapper extends EntityMapper <PurchaseDTO, Purchase> {
    
    @Mapping(target = "purchaseItems", ignore = true)
    Purchase toEntity(PurchaseDTO purchaseDTO); 
    default Purchase fromId(Long id) {
        if (id == null) {
            return null;
        }
        Purchase purchase = new Purchase();
        purchase.setId(id);
        return purchase;
    }
}
