package es.qiu.drzug.service.dto;


import lombok.Data;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;
import java.util.UUID;

/**
 * A DTO for the Storage entity.
 */
@Data
public class StorageDTO implements Serializable {

    private UUID id;

    @NotNull
    private String name;

}
