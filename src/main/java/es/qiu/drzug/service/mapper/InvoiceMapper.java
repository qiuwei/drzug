package es.qiu.drzug.service.mapper;

import es.qiu.drzug.domain.*;
import es.qiu.drzug.service.dto.InvoiceDTO;

import org.mapstruct.*;
import java.util.UUID;

/**
 * Mapper for the entity Invoice and its DTO InvoiceDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class, })
public interface InvoiceMapper extends EntityMapper <InvoiceDTO, Invoice> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.firstName", target = "customerFirstName")
    InvoiceDTO toDto(Invoice invoice);
    @Mapping(target = "invoiceItems", ignore = true)

    @Mapping(source = "customerId", target = "customer")
    Invoice toEntity(InvoiceDTO invoiceDTO);
    default Invoice fromId(UUID id) {
        if (id == null) {
            return null;
        }
        Invoice invoice = new Invoice();
        invoice.setId(id);
        return invoice;
    }
}
