package es.qiu.drzug.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import java.util.UUID;
import java.util.UUID;
import es.qiu.drzug.domain.enumeration.PacketStatus;
import lombok.Data;

/**
 * A DTO for the Packet entity.
 */
@Data
public class PacketDTO implements Serializable {

    private UUID id;

    @NotNull
    private BigDecimal weight;

    @NotNull
    private PacketStatus status;

    private UUID destinationId;

    private String destinationName;

}
