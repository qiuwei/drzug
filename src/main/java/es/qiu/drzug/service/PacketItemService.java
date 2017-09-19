package es.qiu.drzug.service;

import es.qiu.drzug.service.dto.PacketItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

/**
 * Service Interface for managing PacketItem.
 */
public interface PacketItemService {

    /**
     * Save a packetItem.
     *
     * @param packetItemDTO the entity to save
     * @return the persisted entity
     */
    PacketItemDTO save(PacketItemDTO packetItemDTO);

    /**
     *  Get all the packetItems.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<PacketItemDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" packetItem.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    PacketItemDTO findOne(UUID id);

    /**
     *  Delete the "id" packetItem.
     *
     *  @param id the id of the entity
     */
    void delete(UUID id);
}
