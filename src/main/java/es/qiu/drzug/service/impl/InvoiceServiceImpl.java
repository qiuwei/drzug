package es.qiu.drzug.service.impl;

import es.qiu.drzug.service.InvoiceService;
import es.qiu.drzug.domain.Invoice;
import es.qiu.drzug.repository.InvoiceRepository;
import es.qiu.drzug.service.dto.InvoiceDTO;
import es.qiu.drzug.service.mapper.InvoiceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Invoice.
 */
@Service
@Transactional
public class InvoiceServiceImpl implements InvoiceService{

    private final Logger log = LoggerFactory.getLogger(InvoiceServiceImpl.class);

    private final InvoiceRepository invoiceRepository;

    private final InvoiceMapper invoiceMapper;

    public InvoiceServiceImpl(InvoiceRepository invoiceRepository, InvoiceMapper invoiceMapper) {
        this.invoiceRepository = invoiceRepository;
        this.invoiceMapper = invoiceMapper;
    }

    /**
     * Save a invoice.
     *
     * @param invoiceDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public InvoiceDTO save(InvoiceDTO invoiceDTO) {
        log.debug("Request to save Invoice : {}", invoiceDTO);
        Invoice invoice = invoiceMapper.toEntity(invoiceDTO);
        invoice = invoiceRepository.save(invoice);
        return invoiceMapper.toDto(invoice);
    }

    /**
     *  Get all the invoices.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<InvoiceDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Invoices");
        return invoiceRepository.findAll(pageable)
            .map(invoiceMapper::toDto);
    }

    /**
     *  Get one invoice by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public InvoiceDTO findOne(UUID id) {
        log.debug("Request to get Invoice : {}", id);
        Invoice invoice = invoiceRepository.findOne(id);
        return invoiceMapper.toDto(invoice);
    }

    /**
     *  Delete the  invoice by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(UUID id) {
        log.debug("Request to delete Invoice : {}", id);
        invoiceRepository.delete(id);
    }
}
