package es.qiu.drzug.repository;

import es.qiu.drzug.domain.Purchase;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.UUID;


/**
 * Spring Data JPA repository for the Purchase entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, UUID> {

}
