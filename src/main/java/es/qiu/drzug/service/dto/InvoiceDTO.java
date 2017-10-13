package es.qiu.drzug.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import java.util.UUID;
import java.util.UUID;
import es.qiu.drzug.domain.enumeration.InvoiceStatus;
import lombok.Data;

/**
 * A DTO for the Invoice entity.
 */
@Data
public class InvoiceDTO implements Serializable {

    private UUID id;

    @NotNull
    private ZonedDateTime createAt;

    private InvoiceStatus status;

    private UUID customerId;

    private String customerFirstName;
}
