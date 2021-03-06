package es.qiu.drzug.service.impl;

import es.qiu.drzug.service.InvoiceItemService;
import es.qiu.drzug.domain.InvoiceItem;
import es.qiu.drzug.repository.InvoiceItemRepository;
import es.qiu.drzug.service.dto.InvoiceItemDTO;
import es.qiu.drzug.service.mapper.InvoiceItemMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing InvoiceItem.
 */
@Service
@Transactional
public class InvoiceItemServiceImpl implements InvoiceItemService{

    private final Logger log = LoggerFactory.getLogger(InvoiceItemServiceImpl.class);

    private final InvoiceItemRepository invoiceItemRepository;

    private final InvoiceItemMapper invoiceItemMapper;

    public InvoiceItemServiceImpl(InvoiceItemRepository invoiceItemRepository, InvoiceItemMapper invoiceItemMapper) {
        this.invoiceItemRepository = invoiceItemRepository;
        this.invoiceItemMapper = invoiceItemMapper;
    }

    /**
     * Save a invoiceItem.
     *
     * @param invoiceItemDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public InvoiceItemDTO save(InvoiceItemDTO invoiceItemDTO) {
        log.debug("Request to save InvoiceItem : {}", invoiceItemDTO);
        InvoiceItem invoiceItem = invoiceItemMapper.toEntity(invoiceItemDTO);
        invoiceItem = invoiceItemRepository.save(invoiceItem);
        return invoiceItemMapper.toDto(invoiceItem);
    }

    /**
     *  Get all the invoiceItems.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<InvoiceItemDTO> findAll(Pageable pageable) {
        log.debug("Request to get all InvoiceItems");
        return invoiceItemRepository.findAll(pageable)
            .map(invoiceItemMapper::toDto);
    }

    /**
     *  Get one invoiceItem by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public InvoiceItemDTO findOne(UUID id) {
        log.debug("Request to get InvoiceItem : {}", id);
        InvoiceItem invoiceItem = invoiceItemRepository.findOne(id);
        return invoiceItemMapper.toDto(invoiceItem);
    }

    /**
     *  Delete the  invoiceItem by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(UUID id) {
        log.debug("Request to delete InvoiceItem : {}", id);
        invoiceItemRepository.delete(id);
    }
}
