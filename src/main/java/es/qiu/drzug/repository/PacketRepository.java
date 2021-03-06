package es.qiu.drzug.repository;

import es.qiu.drzug.domain.Packet;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.UUID;


/**
 * Spring Data JPA repository for the Packet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PacketRepository extends JpaRepository<Packet, UUID> {

}
