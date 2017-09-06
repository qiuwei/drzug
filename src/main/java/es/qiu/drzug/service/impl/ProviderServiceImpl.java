package es.qiu.drzug.service.impl;

import es.qiu.drzug.service.ProviderService;
import es.qiu.drzug.domain.Provider;
import es.qiu.drzug.repository.ProviderRepository;
import es.qiu.drzug.service.dto.ProviderDTO;
import es.qiu.drzug.service.mapper.ProviderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Provider.
 */
@Service
@Transactional
public class ProviderServiceImpl implements ProviderService{

    private final Logger log = LoggerFactory.getLogger(ProviderServiceImpl.class);

    private final ProviderRepository providerRepository;

    private final ProviderMapper providerMapper;

    public ProviderServiceImpl(ProviderRepository providerRepository, ProviderMapper providerMapper) {
        this.providerRepository = providerRepository;
        this.providerMapper = providerMapper;
    }

    /**
     * Save a provider.
     *
     * @param providerDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProviderDTO save(ProviderDTO providerDTO) {
        log.debug("Request to save Provider : {}", providerDTO);
        Provider provider = providerMapper.toEntity(providerDTO);
        provider = providerRepository.save(provider);
        return providerMapper.toDto(provider);
    }

    /**
     *  Get all the providers.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProviderDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Providers");
        return providerRepository.findAll(pageable)
            .map(providerMapper::toDto);
    }

    /**
     *  Get one provider by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProviderDTO findOne(Long id) {
        log.debug("Request to get Provider : {}", id);
        Provider provider = providerRepository.findOne(id);
        return providerMapper.toDto(provider);
    }

    /**
     *  Delete the  provider by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Provider : {}", id);
        providerRepository.delete(id);
    }
}
