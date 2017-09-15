package es.qiu.drzug.repository;

import es.qiu.drzug.domain.PurchaseItem;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PurchaseItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchaseItemRepository extends JpaRepository<PurchaseItem, Long> {

}
