package es.qiu.drzug.service.dto;


import lombok.Data;

import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import java.util.UUID;
import java.util.UUID;

/**
 * A DTO for the Purchase entity.
 */
@Data
public class PurchaseDTO implements Serializable {

    private UUID id;

    @NotNull
    private ZonedDateTime createdAt;

}
