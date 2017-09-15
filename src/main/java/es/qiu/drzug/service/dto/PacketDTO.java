package es.qiu.drzug.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import es.qiu.drzug.domain.enumeration.PacketStatus;

/**
 * A DTO for the Packet entity.
 */
public class PacketDTO implements Serializable {

    private Long id;

    @NotNull
    private BigDecimal weight;

    @NotNull
    private PacketStatus status;

    private Long destinationId;

    private String destinationName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public PacketStatus getStatus() {
        return status;
    }

    public void setStatus(PacketStatus status) {
        this.status = status;
    }

    public Long getDestinationId() {
        return destinationId;
    }

    public void setDestinationId(Long storageId) {
        this.destinationId = storageId;
    }

    public String getDestinationName() {
        return destinationName;
    }

    public void setDestinationName(String storageName) {
        this.destinationName = storageName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PacketDTO packetDTO = (PacketDTO) o;
        if(packetDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), packetDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PacketDTO{" +
            "id=" + getId() +
            ", weight='" + getWeight() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
