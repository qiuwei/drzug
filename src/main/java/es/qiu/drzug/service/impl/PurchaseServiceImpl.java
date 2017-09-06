package es.qiu.drzug.service.impl;

import es.qiu.drzug.service.PurchaseService;
import es.qiu.drzug.domain.Purchase;
import es.qiu.drzug.repository.PurchaseRepository;
import es.qiu.drzug.service.dto.PurchaseDTO;
import es.qiu.drzug.service.mapper.PurchaseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Purchase.
 */
@Service
@Transactional
public class PurchaseServiceImpl implements PurchaseService{

    private final Logger log = LoggerFactory.getLogger(PurchaseServiceImpl.class);

    private final PurchaseRepository purchaseRepository;

    private final PurchaseMapper purchaseMapper;

    public PurchaseServiceImpl(PurchaseRepository purchaseRepository, PurchaseMapper purchaseMapper) {
        this.purchaseRepository = purchaseRepository;
        this.purchaseMapper = purchaseMapper;
    }

    /**
     * Save a purchase.
     *
     * @param purchaseDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PurchaseDTO save(PurchaseDTO purchaseDTO) {
        log.debug("Request to save Purchase : {}", purchaseDTO);
        Purchase purchase = purchaseMapper.toEntity(purchaseDTO);
        purchase = purchaseRepository.save(purchase);
        return purchaseMapper.toDto(purchase);
    }

    /**
     *  Get all the purchases.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PurchaseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Purchases");
        return purchaseRepository.findAll(pageable)
            .map(purchaseMapper::toDto);
    }

    /**
     *  Get one purchase by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PurchaseDTO findOne(Long id) {
        log.debug("Request to get Purchase : {}", id);
        Purchase purchase = purchaseRepository.findOne(id);
        return purchaseMapper.toDto(purchase);
    }

    /**
     *  Delete the  purchase by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Purchase : {}", id);
        purchaseRepository.delete(id);
    }
}
