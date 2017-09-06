package es.qiu.drzug.service;

import es.qiu.drzug.service.dto.InvoiceDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Invoice.
 */
public interface InvoiceService {

    /**
     * Save a invoice.
     *
     * @param invoiceDTO the entity to save
     * @return the persisted entity
     */
    InvoiceDTO save(InvoiceDTO invoiceDTO);

    /**
     *  Get all the invoices.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<InvoiceDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" invoice.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    InvoiceDTO findOne(Long id);

    /**
     *  Delete the "id" invoice.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
