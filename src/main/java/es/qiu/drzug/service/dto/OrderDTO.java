package es.qiu.drzug.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import java.util.UUID;
import java.util.UUID;

import es.qiu.drzug.domain.OrderItem;
import es.qiu.drzug.domain.enumeration.OrderStatus;
import lombok.Data;

/**
 * A DTO for the Order entity.
 */
@Data
public class OrderDTO implements Serializable {

    private UUID id;

    @NotNull
    private ZonedDateTime createdAt;

    @NotNull
    private OrderStatus status;

    @NotNull
    private Set<OrderItemDTO> orderItemDTOs;

}
