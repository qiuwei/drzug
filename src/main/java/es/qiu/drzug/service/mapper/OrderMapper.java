package es.qiu.drzug.service.mapper;

import es.qiu.drzug.domain.*;
import es.qiu.drzug.service.dto.OrderDTO;

import es.qiu.drzug.service.dto.OrderItemDTO;
import org.mapstruct.*;

import java.util.Set;
import java.util.UUID;

/**
 * Mapper for the entity Order and its DTO OrderDTO.
 */
@Mapper(componentModel = "spring", uses = {OrderItemMapper.class})
public interface OrderMapper extends EntityMapper <OrderDTO, Order> {

    @Mapping(source = "orderItems", target = "orderItemDTOs")
    OrderDTO toDto(Order order);

    @Mapping(source = "orderItemDTOs", target = "orderItems")
    Order toEntity(OrderDTO orderDTO);
    default Order fromId(UUID id) {
        if (id == null) {
            return null;
        }
        Order order = new Order();
        order.setId(id);
        return order;
    }
}
