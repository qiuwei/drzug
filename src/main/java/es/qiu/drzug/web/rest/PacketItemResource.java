package es.qiu.drzug.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.qiu.drzug.service.PacketItemService;
import es.qiu.drzug.web.rest.util.HeaderUtil;
import es.qiu.drzug.web.rest.util.PaginationUtil;
import es.qiu.drzug.service.dto.PacketItemDTO;
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
 * REST controller for managing PacketItem.
 */
@RestController
@RequestMapping("/api/packets/")
public class PacketItemResource {

    private final Logger log = LoggerFactory.getLogger(PacketItemResource.class);

    private static final String ENTITY_NAME = "packetItem";

    private final PacketItemService packetItemService;

    public PacketItemResource(PacketItemService packetItemService) {
        this.packetItemService = packetItemService;
    }

    /**
     * POST  /packet-items : Create a new packetItem.
     *
     * @param packetItemDTO the packetItemDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new packetItemDTO, or with status 400 (Bad Request) if the packetItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("{packet_id}/packet-items")
    @Timed
    public ResponseEntity<PacketItemDTO> createPacketItem(@Valid @RequestBody PacketItemDTO packetItemDTO) throws URISyntaxException {
        log.debug("REST request to save PacketItem : {}", packetItemDTO);
        if (packetItemDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new packetItem cannot already have an ID")).body(null);
        }
        PacketItemDTO result = packetItemService.save(packetItemDTO);
        return ResponseEntity.created(new URI("/api/packet-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /packet-items : Updates an existing packetItem.
     *
     * @param packetItemDTO the packetItemDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated packetItemDTO,
     * or with status 400 (Bad Request) if the packetItemDTO is not valid,
     * or with status 500 (Internal Server Error) if the packetItemDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("{packet_id}/packet-items")
    @Timed
    public ResponseEntity<PacketItemDTO> updatePacketItem(@Valid @RequestBody PacketItemDTO packetItemDTO) throws URISyntaxException {
        log.debug("REST request to update PacketItem : {}", packetItemDTO);
        if (packetItemDTO.getId() == null) {
            return createPacketItem(packetItemDTO);
        }
        PacketItemDTO result = packetItemService.save(packetItemDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, packetItemDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /packet-items : get all the packetItems.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of packetItems in body
     */
    @GetMapping("{packet_id}/packet-items")
    @Timed
    public ResponseEntity<List<PacketItemDTO>> getAllPacketItems(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of PacketItems");
        Page<PacketItemDTO> page = packetItemService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/packet-items");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /packet-items/:id : get the "id" packetItem.
     *
     * @param id the id of the packetItemDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the packetItemDTO, or with status 404 (Not Found)
     */
    @GetMapping("{packet_id}/packet-items/{id}")
    @Timed
    public ResponseEntity<PacketItemDTO> getPacketItem(@PathVariable Long id) {
        log.debug("REST request to get PacketItem : {}", id);
        PacketItemDTO packetItemDTO = packetItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(packetItemDTO));
    }

    /**
     * DELETE  /packet-items/:id : delete the "id" packetItem.
     *
     * @param id the id of the packetItemDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("{packet_id}/packet-items/{id}")
    @Timed
    public ResponseEntity<Void> deletePacketItem(@PathVariable Long id) {
        log.debug("REST request to delete PacketItem : {}", id);
        packetItemService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
