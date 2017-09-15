package es.qiu.drzug.service.mapper;

import es.qiu.drzug.domain.*;
import es.qiu.drzug.service.dto.OrderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Order and its DTO OrderDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OrderMapper extends EntityMapper <OrderDTO, Order> {
    
    @Mapping(target = "orderItems", ignore = true)
    Order toEntity(OrderDTO orderDTO); 
    default Order fromId(Long id) {
        if (id == null) {
            return null;
        }
        Order order = new Order();
        order.setId(id);
        return order;
    }
}
