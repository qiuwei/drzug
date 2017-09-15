package es.qiu.drzug.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.qiu.drzug.service.PurchaseItemService;
import es.qiu.drzug.web.rest.util.HeaderUtil;
import es.qiu.drzug.web.rest.util.PaginationUtil;
import es.qiu.drzug.service.dto.PurchaseItemDTO;
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
 * REST controller for managing PurchaseItem.
 */
@RestController
@RequestMapping("/api")
public class PurchaseItemResource {

    private final Logger log = LoggerFactory.getLogger(PurchaseItemResource.class);

    private static final String ENTITY_NAME = "purchaseItem";

    private final PurchaseItemService purchaseItemService;

    public PurchaseItemResource(PurchaseItemService purchaseItemService) {
        this.purchaseItemService = purchaseItemService;
    }

    /**
     * POST  /purchase-items : Create a new purchaseItem.
     *
     * @param purchaseItemDTO the purchaseItemDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new purchaseItemDTO, or with status 400 (Bad Request) if the purchaseItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/purchase-items")
    @Timed
    public ResponseEntity<PurchaseItemDTO> createPurchaseItem(@Valid @RequestBody PurchaseItemDTO purchaseItemDTO) throws URISyntaxException {
        log.debug("REST request to save PurchaseItem : {}", purchaseItemDTO);
        if (purchaseItemDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new purchaseItem cannot already have an ID")).body(null);
        }
        PurchaseItemDTO result = purchaseItemService.save(purchaseItemDTO);
        return ResponseEntity.created(new URI("/api/purchase-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /purchase-items : Updates an existing purchaseItem.
     *
     * @param purchaseItemDTO the purchaseItemDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated purchaseItemDTO,
     * or with status 400 (Bad Request) if the purchaseItemDTO is not valid,
     * or with status 500 (Internal Server Error) if the purchaseItemDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/purchase-items")
    @Timed
    public ResponseEntity<PurchaseItemDTO> updatePurchaseItem(@Valid @RequestBody PurchaseItemDTO purchaseItemDTO) throws URISyntaxException {
        log.debug("REST request to update PurchaseItem : {}", purchaseItemDTO);
        if (purchaseItemDTO.getId() == null) {
            return createPurchaseItem(purchaseItemDTO);
        }
        PurchaseItemDTO result = purchaseItemService.save(purchaseItemDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, purchaseItemDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /purchase-items : get all the purchaseItems.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of purchaseItems in body
     */
    @GetMapping("/purchase-items")
    @Timed
    public ResponseEntity<List<PurchaseItemDTO>> getAllPurchaseItems(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of PurchaseItems");
        Page<PurchaseItemDTO> page = purchaseItemService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/purchase-items");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /purchase-items/:id : get the "id" purchaseItem.
     *
     * @param id the id of the purchaseItemDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the purchaseItemDTO, or with status 404 (Not Found)
     */
    @GetMapping("/purchase-items/{id}")
    @Timed
    public ResponseEntity<PurchaseItemDTO> getPurchaseItem(@PathVariable Long id) {
        log.debug("REST request to get PurchaseItem : {}", id);
        PurchaseItemDTO purchaseItemDTO = purchaseItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(purchaseItemDTO));
    }

    /**
     * DELETE  /purchase-items/:id : delete the "id" purchaseItem.
     *
     * @param id the id of the purchaseItemDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/purchase-items/{id}")
    @Timed
    public ResponseEntity<Void> deletePurchaseItem(@PathVariable Long id) {
        log.debug("REST request to delete PurchaseItem : {}", id);
        purchaseItemService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
