package es.qiu.drzug.service.mapper;

import es.qiu.drzug.domain.*;
import es.qiu.drzug.service.dto.InvoiceItemDTO;

import org.mapstruct.*;
import java.util.UUID;

/**
 * Mapper for the entity InvoiceItem and its DTO InvoiceItemDTO.
 */
@Mapper(componentModel = "spring", uses = {InvoiceMapper.class, ProductMapper.class, TaxMapper.class, })
public interface InvoiceItemMapper extends EntityMapper <InvoiceItemDTO, InvoiceItem> {

    @Mapping(source = "invoice.id", target = "invoiceId")

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")

    @Mapping(source = "tax.id", target = "taxId")
    @Mapping(source = "tax.name", target = "taxName")
    InvoiceItemDTO toDto(InvoiceItem invoiceItem); 

    @Mapping(source = "invoiceId", target = "invoice")

    @Mapping(source = "productId", target = "product")

    @Mapping(source = "taxId", target = "tax")
    InvoiceItem toEntity(InvoiceItemDTO invoiceItemDTO); 
    default InvoiceItem fromId(UUID id) {
        if (id == null) {
            return null;
        }
        InvoiceItem invoiceItem = new InvoiceItem();
        invoiceItem.setId(id);
        return invoiceItem;
    }
}
