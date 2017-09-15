package es.qiu.drzug.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.qiu.drzug.service.TaxService;
import es.qiu.drzug.web.rest.util.HeaderUtil;
import es.qiu.drzug.web.rest.util.PaginationUtil;
import es.qiu.drzug.service.dto.TaxDTO;
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
 * REST controller for managing Tax.
 */
@RestController
@RequestMapping("/api")
public class TaxResource {

    private final Logger log = LoggerFactory.getLogger(TaxResource.class);

    private static final String ENTITY_NAME = "tax";

    private final TaxService taxService;

    public TaxResource(TaxService taxService) {
        this.taxService = taxService;
    }

    /**
     * POST  /taxes : Create a new tax.
     *
     * @param taxDTO the taxDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new taxDTO, or with status 400 (Bad Request) if the tax has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/taxes")
    @Timed
    public ResponseEntity<TaxDTO> createTax(@Valid @RequestBody TaxDTO taxDTO) throws URISyntaxException {
        log.debug("REST request to save Tax : {}", taxDTO);
        if (taxDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new tax cannot already have an ID")).body(null);
        }
        TaxDTO result = taxService.save(taxDTO);
        return ResponseEntity.created(new URI("/api/taxes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /taxes : Updates an existing tax.
     *
     * @param taxDTO the taxDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated taxDTO,
     * or with status 400 (Bad Request) if the taxDTO is not valid,
     * or with status 500 (Internal Server Error) if the taxDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/taxes")
    @Timed
    public ResponseEntity<TaxDTO> updateTax(@Valid @RequestBody TaxDTO taxDTO) throws URISyntaxException {
        log.debug("REST request to update Tax : {}", taxDTO);
        if (taxDTO.getId() == null) {
            return createTax(taxDTO);
        }
        TaxDTO result = taxService.save(taxDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, taxDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /taxes : get all the taxes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of taxes in body
     */
    @GetMapping("/taxes")
    @Timed
    public ResponseEntity<List<TaxDTO>> getAllTaxes(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Taxes");
        Page<TaxDTO> page = taxService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/taxes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /taxes/:id : get the "id" tax.
     *
     * @param id the id of the taxDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the taxDTO, or with status 404 (Not Found)
     */
    @GetMapping("/taxes/{id}")
    @Timed
    public ResponseEntity<TaxDTO> getTax(@PathVariable Long id) {
        log.debug("REST request to get Tax : {}", id);
        TaxDTO taxDTO = taxService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(taxDTO));
    }

    /**
     * DELETE  /taxes/:id : delete the "id" tax.
     *
     * @param id the id of the taxDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/taxes/{id}")
    @Timed
    public ResponseEntity<Void> deleteTax(@PathVariable Long id) {
        log.debug("REST request to delete Tax : {}", id);
        taxService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
