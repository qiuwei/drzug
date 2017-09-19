package es.qiu.drzug.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.qiu.drzug.service.PurchaseService;
import es.qiu.drzug.web.rest.util.HeaderUtil;
import es.qiu.drzug.web.rest.util.PaginationUtil;
import es.qiu.drzug.service.dto.PurchaseDTO;
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
import java.util.UUID;
import java.util.Optional;

/**
 * REST controller for managing Purchase.
 */
@RestController
@RequestMapping("/api")
public class PurchaseResource {

    private final Logger log = LoggerFactory.getLogger(PurchaseResource.class);

    private static final String ENTITY_NAME = "purchase";

    private final PurchaseService purchaseService;

    public PurchaseResource(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    /**
     * POST  /purchases : Create a new purchase.
     *
     * @param purchaseDTO the purchaseDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new purchaseDTO, or with status 400 (Bad Request) if the purchase has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/purchases")
    @Timed
    public ResponseEntity<PurchaseDTO> createPurchase(@Valid @RequestBody PurchaseDTO purchaseDTO) throws URISyntaxException {
        log.debug("REST request to save Purchase : {}", purchaseDTO);
        if (purchaseDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new purchase cannot already have an ID")).body(null);
        }
        PurchaseDTO result = purchaseService.save(purchaseDTO);
        return ResponseEntity.created(new URI("/api/purchases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /purchases : Updates an existing purchase.
     *
     * @param purchaseDTO the purchaseDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated purchaseDTO,
     * or with status 400 (Bad Request) if the purchaseDTO is not valid,
     * or with status 500 (Internal Server Error) if the purchaseDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/purchases")
    @Timed
    public ResponseEntity<PurchaseDTO> updatePurchase(@Valid @RequestBody PurchaseDTO purchaseDTO) throws URISyntaxException {
        log.debug("REST request to update Purchase : {}", purchaseDTO);
        if (purchaseDTO.getId() == null) {
            return createPurchase(purchaseDTO);
        }
        PurchaseDTO result = purchaseService.save(purchaseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, purchaseDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /purchases : get all the purchases.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of purchases in body
     */
    @GetMapping("/purchases")
    @Timed
    public ResponseEntity<List<PurchaseDTO>> getAllPurchases(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Purchases");
        Page<PurchaseDTO> page = purchaseService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/purchases");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /purchases/:id : get the "id" purchase.
     *
     * @param id the id of the purchaseDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the purchaseDTO, or with status 404 (Not Found)
     */
    @GetMapping("/purchases/{id}")
    @Timed
    public ResponseEntity<PurchaseDTO> getPurchase(@PathVariable UUID id) {
        log.debug("REST request to get Purchase : {}", id);
        PurchaseDTO purchaseDTO = purchaseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(purchaseDTO));
    }

    /**
     * DELETE  /purchases/:id : delete the "id" purchase.
     *
     * @param id the id of the purchaseDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/purchases/{id}")
    @Timed
    public ResponseEntity<Void> deletePurchase(@PathVariable UUID id) {
        log.debug("REST request to delete Purchase : {}", id);
        purchaseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
