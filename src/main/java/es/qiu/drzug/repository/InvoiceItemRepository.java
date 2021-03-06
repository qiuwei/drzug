package es.qiu.drzug.repository;

import es.qiu.drzug.domain.InvoiceItem;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.UUID;


/**
 * Spring Data JPA repository for the InvoiceItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoiceItemRepository extends JpaRepository<InvoiceItem, UUID> {

}
