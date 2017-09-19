package es.qiu.drzug.service.mapper;

import es.qiu.drzug.domain.*;
import es.qiu.drzug.service.dto.PaymentDTO;

import org.mapstruct.*;
import java.util.UUID;

/**
 * Mapper for the entity Payment and its DTO PaymentDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PaymentMapper extends EntityMapper <PaymentDTO, Payment> {
    
    
    default Payment fromId(UUID id) {
        if (id == null) {
            return null;
        }
        Payment payment = new Payment();
        payment.setId(id);
        return payment;
    }
}
