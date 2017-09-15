package es.qiu.drzug.service;

import es.qiu.drzug.service.dto.PurchaseItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing PurchaseItem.
 */
public interface PurchaseItemService {

    /**
     * Save a purchaseItem.
     *
     * @param purchaseItemDTO the entity to save
     * @return the persisted entity
     */
    PurchaseItemDTO save(PurchaseItemDTO purchaseItemDTO);

    /**
     *  Get all the purchaseItems.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<PurchaseItemDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" purchaseItem.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    PurchaseItemDTO findOne(Long id);

    /**
     *  Delete the "id" purchaseItem.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
