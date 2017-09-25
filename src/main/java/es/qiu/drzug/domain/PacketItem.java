package es.qiu.drzug.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * A PacketItem.
 */
@Entity
@Table(name = "packet_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PacketItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private UUID id;

    @NotNull
    @Column(name = "count", nullable = false)
    private Long count;

    @ManyToOne
    private Packet packet;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Long getCount() {
        return count;
    }

    public PacketItem count(Long count) {
        this.count = count;
        return this;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public Packet getPacket() {
        return packet;
    }

    public PacketItem packet(Packet packet) {
        this.packet = packet;
        return this;
    }

    public void setPacket(Packet packet) {
        this.packet = packet;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PacketItem packetItem = (PacketItem) o;
        if (packetItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), packetItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PacketItem{" +
            "id=" + getId() +
            ", count='" + getCount() + "'" +
            "}";
    }
}
