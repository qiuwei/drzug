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
 * A DTO for the PacketItem entity.
 */
@Data
public class PacketItemDTO implements Serializable {

    private UUID id;

    @NotNull
    private Long count;

    private UUID packetId;

}
