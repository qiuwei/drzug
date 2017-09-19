package es.qiu.drzug.service;

import es.qiu.drzug.service.dto.PacketDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

/**
 * Service Interface for managing Packet.
 */
public interface PacketService {

    /**
     * Save a packet.
     *
     * @param packetDTO the entity to save
     * @return the persisted entity
     */
    PacketDTO save(PacketDTO packetDTO);

    /**
     *  Get all the packets.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<PacketDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" packet.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    PacketDTO findOne(UUID id);

    /**
     *  Delete the "id" packet.
     *
     *  @param id the id of the entity
     */
    void delete(UUID id);
}
