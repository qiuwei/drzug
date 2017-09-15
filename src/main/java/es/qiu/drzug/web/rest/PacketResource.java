package es.qiu.drzug.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.qiu.drzug.service.PacketService;
import es.qiu.drzug.web.rest.util.HeaderUtil;
import es.qiu.drzug.web.rest.util.PaginationUtil;
import es.qiu.drzug.service.dto.PacketDTO;
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
 * REST controller for managing Packet.
 */
@RestController
@RequestMapping("/api")
public class PacketResource {

    private final Logger log = LoggerFactory.getLogger(PacketResource.class);

    private static final String ENTITY_NAME = "packet";

    private final PacketService packetService;

    public PacketResource(PacketService packetService) {
        this.packetService = packetService;
    }

    /**
     * POST  /packets : Create a new packet.
     *
     * @param packetDTO the packetDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new packetDTO, or with status 400 (Bad Request) if the packet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/packets")
    @Timed
    public ResponseEntity<PacketDTO> createPacket(@Valid @RequestBody PacketDTO packetDTO) throws URISyntaxException {
        log.debug("REST request to save Packet : {}", packetDTO);
        if (packetDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new packet cannot already have an ID")).body(null);
        }
        PacketDTO result = packetService.save(packetDTO);
        return ResponseEntity.created(new URI("/api/packets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /packets : Updates an existing packet.
     *
     * @param packetDTO the packetDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated packetDTO,
     * or with status 400 (Bad Request) if the packetDTO is not valid,
     * or with status 500 (Internal Server Error) if the packetDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/packets")
    @Timed
    public ResponseEntity<PacketDTO> updatePacket(@Valid @RequestBody PacketDTO packetDTO) throws URISyntaxException {
        log.debug("REST request to update Packet : {}", packetDTO);
        if (packetDTO.getId() == null) {
            return createPacket(packetDTO);
        }
        PacketDTO result = packetService.save(packetDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, packetDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /packets : get all the packets.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of packets in body
     */
    @GetMapping("/packets")
    @Timed
    public ResponseEntity<List<PacketDTO>> getAllPackets(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Packets");
        Page<PacketDTO> page = packetService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/packets");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /packets/:id : get the "id" packet.
     *
     * @param id the id of the packetDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the packetDTO, or with status 404 (Not Found)
     */
    @GetMapping("/packets/{id}")
    @Timed
    public ResponseEntity<PacketDTO> getPacket(@PathVariable Long id) {
        log.debug("REST request to get Packet : {}", id);
        PacketDTO packetDTO = packetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(packetDTO));
    }

    /**
     * DELETE  /packets/:id : delete the "id" packet.
     *
     * @param id the id of the packetDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/packets/{id}")
    @Timed
    public ResponseEntity<Void> deletePacket(@PathVariable Long id) {
        log.debug("REST request to delete Packet : {}", id);
        packetService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
