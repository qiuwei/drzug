package es.qiu.drzug.service.dto;


import lombok.Data;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;
import java.util.UUID;

/**
 * A DTO for the Tax entity.
 */
@Data
public class TaxDTO implements Serializable {

    private UUID id;

    @NotNull
    private String name;

    @NotNull
    private BigDecimal rate;

}
