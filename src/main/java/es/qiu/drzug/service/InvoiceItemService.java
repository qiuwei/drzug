package es.qiu.drzug.service;

import es.qiu.drzug.service.dto.InvoiceItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing InvoiceItem.
 */
public interface InvoiceItemService {

    /**
     * Save a invoiceItem.
     *
     * @param invoiceItemDTO the entity to save
     * @return the persisted entity
     */
    InvoiceItemDTO save(InvoiceItemDTO invoiceItemDTO);

    /**
     *  Get all the invoiceItems.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<InvoiceItemDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" invoiceItem.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    InvoiceItemDTO findOne(Long id);

    /**
     *  Delete the "id" invoiceItem.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
