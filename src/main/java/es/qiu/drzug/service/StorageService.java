package es.qiu.drzug.service;

import es.qiu.drzug.service.dto.StorageDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Storage.
 */
public interface StorageService {

    /**
     * Save a storage.
     *
     * @param storageDTO the entity to save
     * @return the persisted entity
     */
    StorageDTO save(StorageDTO storageDTO);

    /**
     *  Get all the storages.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<StorageDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" storage.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    StorageDTO findOne(Long id);

    /**
     *  Delete the "id" storage.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
