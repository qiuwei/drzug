package es.qiu.drzug.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.qiu.drzug.service.InvoiceItemService;
import es.qiu.drzug.web.rest.util.HeaderUtil;
import es.qiu.drzug.web.rest.util.PaginationUtil;
import es.qiu.drzug.service.dto.InvoiceItemDTO;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing InvoiceItem.
 */
@RestController
@RequestMapping("/api")
public class InvoiceItemResource {

    private final Logger log = LoggerFactory.getLogger(InvoiceItemResource.class);

    private static final String ENTITY_NAME = "invoiceItem";

    private final InvoiceItemService invoiceItemService;

    public InvoiceItemResource(InvoiceItemService invoiceItemService) {
        this.invoiceItemService = invoiceItemService;
    }

    /**
     * POST  /invoice-items : Create a new invoiceItem.
     *
     * @param invoiceItemDTO the invoiceItemDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new invoiceItemDTO, or with status 400 (Bad Request) if the invoiceItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/invoice-items")
    @Timed
    public ResponseEntity<InvoiceItemDTO> createInvoiceItem(@Valid @RequestBody InvoiceItemDTO invoiceItemDTO) throws URISyntaxException {
        log.debug("REST request to save InvoiceItem : {}", invoiceItemDTO);
        if (invoiceItemDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new invoiceItem cannot already have an ID")).body(null);
        }
        InvoiceItemDTO result = invoiceItemService.save(invoiceItemDTO);
        return ResponseEntity.created(new URI("/api/invoice-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /invoice-items : Updates an existing invoiceItem.
     *
     * @param invoiceItemDTO the invoiceItemDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated invoiceItemDTO,
     * or with status 400 (Bad Request) if the invoiceItemDTO is not valid,
     * or with status 500 (Internal Server Error) if the invoiceItemDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/invoice-items")
    @Timed
    public ResponseEntity<InvoiceItemDTO> updateInvoiceItem(@Valid @RequestBody InvoiceItemDTO invoiceItemDTO) throws URISyntaxException {
        log.debug("REST request to update InvoiceItem : {}", invoiceItemDTO);
        if (invoiceItemDTO.getId() == null) {
            return createInvoiceItem(invoiceItemDTO);
        }
        InvoiceItemDTO result = invoiceItemService.save(invoiceItemDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, invoiceItemDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /invoice-items : get all the invoiceItems.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of invoiceItems in body
     */
    @GetMapping("/invoice-items")
    @Timed
    public ResponseEntity<List<InvoiceItemDTO>> getAllInvoiceItems(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of InvoiceItems");
        Page<InvoiceItemDTO> page = invoiceItemService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/invoice-items");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /invoice-items/:id : get the "id" invoiceItem.
     *
     * @param id the id of the invoiceItemDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the invoiceItemDTO, or with status 404 (Not Found)
     */
    @GetMapping("/invoice-items/{id}")
    @Timed
    public ResponseEntity<InvoiceItemDTO> getInvoiceItem(@PathVariable Long id) {
        log.debug("REST request to get InvoiceItem : {}", id);
        InvoiceItemDTO invoiceItemDTO = invoiceItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(invoiceItemDTO));
    }

    /**
     * DELETE  /invoice-items/:id : delete the "id" invoiceItem.
     *
     * @param id the id of the invoiceItemDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/invoice-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteInvoiceItem(@PathVariable Long id) {
        log.debug("REST request to delete InvoiceItem : {}", id);
        invoiceItemService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
