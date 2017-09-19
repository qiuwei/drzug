package es.qiu.drzug.service.impl;

import es.qiu.drzug.service.PurchaseItemService;
import es.qiu.drzug.domain.PurchaseItem;
import es.qiu.drzug.repository.PurchaseItemRepository;
import es.qiu.drzug.service.dto.PurchaseItemDTO;
import es.qiu.drzug.service.mapper.PurchaseItemMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing PurchaseItem.
 */
@Service
@Transactional
public class PurchaseItemServiceImpl implements PurchaseItemService{

    private final Logger log = LoggerFactory.getLogger(PurchaseItemServiceImpl.class);

    private final PurchaseItemRepository purchaseItemRepository;

    private final PurchaseItemMapper purchaseItemMapper;

    public PurchaseItemServiceImpl(PurchaseItemRepository purchaseItemRepository, PurchaseItemMapper purchaseItemMapper) {
        this.purchaseItemRepository = purchaseItemRepository;
        this.purchaseItemMapper = purchaseItemMapper;
    }

    /**
     * Save a purchaseItem.
     *
     * @param purchaseItemDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PurchaseItemDTO save(PurchaseItemDTO purchaseItemDTO) {
        log.debug("Request to save PurchaseItem : {}", purchaseItemDTO);
        PurchaseItem purchaseItem = purchaseItemMapper.toEntity(purchaseItemDTO);
        purchaseItem = purchaseItemRepository.save(purchaseItem);
        return purchaseItemMapper.toDto(purchaseItem);
    }

    /**
     *  Get all the purchaseItems.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PurchaseItemDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PurchaseItems");
        return purchaseItemRepository.findAll(pageable)
            .map(purchaseItemMapper::toDto);
    }

    /**
     *  Get one purchaseItem by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PurchaseItemDTO findOne(UUID id) {
        log.debug("Request to get PurchaseItem : {}", id);
        PurchaseItem purchaseItem = purchaseItemRepository.findOne(id);
        return purchaseItemMapper.toDto(purchaseItem);
    }

    /**
     *  Delete the  purchaseItem by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(UUID id) {
        log.debug("Request to delete PurchaseItem : {}", id);
        purchaseItemRepository.delete(id);
    }
}
