package es.qiu.drzug.service.impl;

import es.qiu.drzug.service.PacketService;
import es.qiu.drzug.domain.Packet;
import es.qiu.drzug.repository.PacketRepository;
import es.qiu.drzug.service.dto.PacketDTO;
import es.qiu.drzug.service.mapper.PacketMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Packet.
 */
@Service
@Transactional
public class PacketServiceImpl implements PacketService{

    private final Logger log = LoggerFactory.getLogger(PacketServiceImpl.class);

    private final PacketRepository packetRepository;

    private final PacketMapper packetMapper;

    public PacketServiceImpl(PacketRepository packetRepository, PacketMapper packetMapper) {
        this.packetRepository = packetRepository;
        this.packetMapper = packetMapper;
    }

    /**
     * Save a packet.
     *
     * @param packetDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PacketDTO save(PacketDTO packetDTO) {
        log.debug("Request to save Packet : {}", packetDTO);
        Packet packet = packetMapper.toEntity(packetDTO);
        packet = packetRepository.save(packet);
        return packetMapper.toDto(packet);
    }

    /**
     *  Get all the packets.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PacketDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Packets");
        return packetRepository.findAll(pageable)
            .map(packetMapper::toDto);
    }

    /**
     *  Get one packet by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PacketDTO findOne(UUID id) {
        log.debug("Request to get Packet : {}", id);
        Packet packet = packetRepository.findOne(id);
        return packetMapper.toDto(packet);
    }

    /**
     *  Delete the  packet by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(UUID id) {
        log.debug("Request to delete Packet : {}", id);
        packetRepository.delete(id);
    }
}
