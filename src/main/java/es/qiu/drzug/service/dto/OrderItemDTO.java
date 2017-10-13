package es.qiu.drzug.service.dto;


import lombok.Data;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

/**
 * A DTO for the OrderItem entity.
 */
@Data
public class OrderItemDTO implements Serializable {

    private UUID id;

    @NotNull
    private Long count;

    private BigDecimal salePrice;

    private UUID productId;

    private String productName;

    private UUID orderId;

    private Set<OrderItemDTO> orderItemDTOs;
}
