package es.qiu.drzug.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;
import java.util.UUID;
import es.qiu.drzug.domain.enumeration.Unit;
import lombok.Data;

/**
 * A DTO for the Payment entity.
 */
@Data
public class PaymentDTO implements Serializable {

    private UUID id;

    @NotNull
    private ZonedDateTime date;

    @NotNull
    private BigDecimal amount;

    @NotNull
    private Unit unit;
}
