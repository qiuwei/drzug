package es.qiu.drzug.service.impl;

import es.qiu.drzug.service.StorageService;
import es.qiu.drzug.domain.Storage;
import es.qiu.drzug.repository.StorageRepository;
import es.qiu.drzug.service.dto.StorageDTO;
import es.qiu.drzug.service.mapper.StorageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Storage.
 */
@Service
@Transactional
public class StorageServiceImpl implements StorageService{

    private final Logger log = LoggerFactory.getLogger(StorageServiceImpl.class);

    private final StorageRepository storageRepository;

    private final StorageMapper storageMapper;

    public StorageServiceImpl(StorageRepository storageRepository, StorageMapper storageMapper) {
        this.storageRepository = storageRepository;
        this.storageMapper = storageMapper;
    }

    /**
     * Save a storage.
     *
     * @param storageDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public StorageDTO save(StorageDTO storageDTO) {
        log.debug("Request to save Storage : {}", storageDTO);
        Storage storage = storageMapper.toEntity(storageDTO);
        storage = storageRepository.save(storage);
        return storageMapper.toDto(storage);
    }

    /**
     *  Get all the storages.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<StorageDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Storages");
        return storageRepository.findAll(pageable)
            .map(storageMapper::toDto);
    }

    /**
     *  Get one storage by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public StorageDTO findOne(UUID id) {
        log.debug("Request to get Storage : {}", id);
        Storage storage = storageRepository.findOne(id);
        return storageMapper.toDto(storage);
    }

    /**
     *  Delete the  storage by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(UUID id) {
        log.debug("Request to delete Storage : {}", id);
        storageRepository.delete(id);
    }
}
