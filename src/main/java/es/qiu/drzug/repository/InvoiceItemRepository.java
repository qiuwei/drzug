package es.qiu.drzug.repository;

import es.qiu.drzug.domain.InvoiceItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the InvoiceItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoiceItemRepository extends JpaRepository<InvoiceItem,Long> {

    Page<InvoiceItem> findAllByInvoiceId(Pageable pageable, Long invoiceId);
}
