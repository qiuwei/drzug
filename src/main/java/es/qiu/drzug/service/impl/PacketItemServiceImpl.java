package es.qiu.drzug.service.impl;

import es.qiu.drzug.service.PacketItemService;
import es.qiu.drzug.domain.PacketItem;
import es.qiu.drzug.repository.PacketItemRepository;
import es.qiu.drzug.service.dto.PacketItemDTO;
import es.qiu.drzug.service.mapper.PacketItemMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing PacketItem.
 */
@Service
@Transactional
public class PacketItemServiceImpl implements PacketItemService{

    private final Logger log = LoggerFactory.getLogger(PacketItemServiceImpl.class);

    private final PacketItemRepository packetItemRepository;

    private final PacketItemMapper packetItemMapper;

    public PacketItemServiceImpl(PacketItemRepository packetItemRepository, PacketItemMapper packetItemMapper) {
        this.packetItemRepository = packetItemRepository;
        this.packetItemMapper = packetItemMapper;
    }

    /**
     * Save a packetItem.
     *
     * @param packetItemDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PacketItemDTO save(PacketItemDTO packetItemDTO) {
        log.debug("Request to save PacketItem : {}", packetItemDTO);
        PacketItem packetItem = packetItemMapper.toEntity(packetItemDTO);
        packetItem = packetItemRepository.save(packetItem);
        return packetItemMapper.toDto(packetItem);
    }

    /**
     *  Get all the packetItems.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PacketItemDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PacketItems");
        return packetItemRepository.findAll(pageable)
            .map(packetItemMapper::toDto);
    }

    /**
     *  Get one packetItem by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PacketItemDTO findOne(UUID id) {
        log.debug("Request to get PacketItem : {}", id);
        PacketItem packetItem = packetItemRepository.findOne(id);
        return packetItemMapper.toDto(packetItem);
    }

    /**
     *  Delete the  packetItem by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(UUID id) {
        log.debug("Request to delete PacketItem : {}", id);
        packetItemRepository.delete(id);
    }
}
