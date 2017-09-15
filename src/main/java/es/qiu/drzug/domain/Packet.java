package es.qiu.drzug.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import es.qiu.drzug.domain.enumeration.PacketStatus;

/**
 * A Packet.
 */
@Entity
@Table(name = "packet")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Packet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "weight", precision=10, scale=2, nullable = false)
    private BigDecimal weight;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private PacketStatus status;

    @OneToOne
    @JoinColumn(unique = true)
    private Storage destination;

    @OneToMany(mappedBy = "packet")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PacketItem> packetItems = new HashSet<>();

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public Packet weight(BigDecimal weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public PacketStatus getStatus() {
        return status;
    }

    public Packet status(PacketStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(PacketStatus status) {
        this.status = status;
    }

    public Storage getDestination() {
        return destination;
    }

    public Packet destination(Storage storage) {
        this.destination = storage;
        return this;
    }

    public void setDestination(Storage storage) {
        this.destination = storage;
    }

    public Set<PacketItem> getPacketItems() {
        return packetItems;
    }

    public Packet packetItems(Set<PacketItem> packetItems) {
        this.packetItems = packetItems;
        return this;
    }

    public Packet addPacketItem(PacketItem packetItem) {
        this.packetItems.add(packetItem);
        packetItem.setPacket(this);
        return this;
    }

    public Packet removePacketItem(PacketItem packetItem) {
        this.packetItems.remove(packetItem);
        packetItem.setPacket(null);
        return this;
    }

    public void setPacketItems(Set<PacketItem> packetItems) {
        this.packetItems = packetItems;
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
        Packet packet = (Packet) o;
        if (packet.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), packet.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Packet{" +
            "id=" + getId() +
            ", weight='" + getWeight() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
