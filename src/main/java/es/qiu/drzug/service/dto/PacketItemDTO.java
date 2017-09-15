package es.qiu.drzug.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the PacketItem entity.
 */
public class PacketItemDTO implements Serializable {

    private Long id;

    @NotNull
    private Long count;

    private Long packetId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public Long getPacketId() {
        return packetId;
    }

    public void setPacketId(Long packetId) {
        this.packetId = packetId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PacketItemDTO packetItemDTO = (PacketItemDTO) o;
        if(packetItemDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), packetItemDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PacketItemDTO{" +
            "id=" + getId() +
            ", count='" + getCount() + "'" +
            "}";
    }
}
