package es.qiu.drzug.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.qiu.drzug.service.ProviderService;
import es.qiu.drzug.web.rest.util.HeaderUtil;
import es.qiu.drzug.web.rest.util.PaginationUtil;
import es.qiu.drzug.service.dto.ProviderDTO;
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
 * REST controller for managing Provider.
 */
@RestController
@RequestMapping("/api")
public class ProviderResource {

    private final Logger log = LoggerFactory.getLogger(ProviderResource.class);

    private static final String ENTITY_NAME = "provider";

    private final ProviderService providerService;

    public ProviderResource(ProviderService providerService) {
        this.providerService = providerService;
    }

    /**
     * POST  /providers : Create a new provider.
     *
     * @param providerDTO the providerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new providerDTO, or with status 400 (Bad Request) if the provider has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/providers")
    @Timed
    public ResponseEntity<ProviderDTO> createProvider(@Valid @RequestBody ProviderDTO providerDTO) throws URISyntaxException {
        log.debug("REST request to save Provider : {}", providerDTO);
        if (providerDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new provider cannot already have an ID")).body(null);
        }
        ProviderDTO result = providerService.save(providerDTO);
        return ResponseEntity.created(new URI("/api/providers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /providers : Updates an existing provider.
     *
     * @param providerDTO the providerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated providerDTO,
     * or with status 400 (Bad Request) if the providerDTO is not valid,
     * or with status 500 (Internal Server Error) if the providerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/providers")
    @Timed
    public ResponseEntity<ProviderDTO> updateProvider(@Valid @RequestBody ProviderDTO providerDTO) throws URISyntaxException {
        log.debug("REST request to update Provider : {}", providerDTO);
        if (providerDTO.getId() == null) {
            return createProvider(providerDTO);
        }
        ProviderDTO result = providerService.save(providerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, providerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /providers : get all the providers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of providers in body
     */
    @GetMapping("/providers")
    @Timed
    public ResponseEntity<List<ProviderDTO>> getAllProviders(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Providers");
        Page<ProviderDTO> page = providerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/providers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /providers/:id : get the "id" provider.
     *
     * @param id the id of the providerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the providerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/providers/{id}")
    @Timed
    public ResponseEntity<ProviderDTO> getProvider(@PathVariable UUID id) {
        log.debug("REST request to get Provider : {}", id);
        ProviderDTO providerDTO = providerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(providerDTO));
    }

    /**
     * DELETE  /providers/:id : delete the "id" provider.
     *
     * @param id the id of the providerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/providers/{id}")
    @Timed
    public ResponseEntity<Void> deleteProvider(@PathVariable UUID id) {
        log.debug("REST request to delete Provider : {}", id);
        providerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
