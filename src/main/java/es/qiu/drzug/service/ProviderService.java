package es.qiu.drzug.service;

import es.qiu.drzug.service.dto.ProviderDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Provider.
 */
public interface ProviderService {

    /**
     * Save a provider.
     *
     * @param providerDTO the entity to save
     * @return the persisted entity
     */
    ProviderDTO save(ProviderDTO providerDTO);

    /**
     *  Get all the providers.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<ProviderDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" provider.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ProviderDTO findOne(Long id);

    /**
     *  Delete the "id" provider.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
