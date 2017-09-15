package es.qiu.drzug.service.mapper;

import es.qiu.drzug.domain.*;
import es.qiu.drzug.service.dto.PurchaseItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PurchaseItem and its DTO PurchaseItemDTO.
 */
@Mapper(componentModel = "spring", uses = {PurchaseMapper.class, ProductMapper.class, })
public interface PurchaseItemMapper extends EntityMapper <PurchaseItemDTO, PurchaseItem> {

    @Mapping(source = "purchase.id", target = "purchaseId")

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    PurchaseItemDTO toDto(PurchaseItem purchaseItem); 

    @Mapping(source = "purchaseId", target = "purchase")

    @Mapping(source = "productId", target = "product")
    PurchaseItem toEntity(PurchaseItemDTO purchaseItemDTO); 
    default PurchaseItem fromId(Long id) {
        if (id == null) {
            return null;
        }
        PurchaseItem purchaseItem = new PurchaseItem();
        purchaseItem.setId(id);
        return purchaseItem;
    }
}
