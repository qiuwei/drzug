package es.qiu.drzug.service;

import es.qiu.drzug.service.dto.TaxDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Tax.
 */
public interface TaxService {

    /**
     * Save a tax.
     *
     * @param taxDTO the entity to save
     * @return the persisted entity
     */
    TaxDTO save(TaxDTO taxDTO);

    /**
     *  Get all the taxes.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<TaxDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" tax.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    TaxDTO findOne(Long id);

    /**
     *  Delete the "id" tax.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
