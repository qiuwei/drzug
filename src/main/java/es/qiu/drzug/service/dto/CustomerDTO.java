package es.qiu.drzug.service.dto;


import lombok.Data;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import java.util.UUID;
import java.util.UUID;

/**
 * A DTO for the Customer entity.
 */
@Data
public class CustomerDTO implements Serializable {

    private UUID id;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

}
