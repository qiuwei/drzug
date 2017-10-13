package es.qiu.drzug.service.dto;


import lombok.Data;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;

/**
 * A DTO for the InvoiceItem entity.
 */
@Data
public class InvoiceItemDTO implements Serializable {

    private UUID id;

    @NotNull
    private Long count;

    private BigDecimal discount;

    private UUID invoiceId;

    private UUID productId;

    private String productName;

    private UUID taxId;

    private String taxName;
}
