package es.qiu.drzug.repository;

import es.qiu.drzug.domain.PacketItem;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.UUID;


/**
 * Spring Data JPA repository for the PacketItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PacketItemRepository extends JpaRepository<PacketItem, UUID> {

}
