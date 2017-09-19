package es.qiu.drzug.service.impl;

import es.qiu.drzug.service.OrderItemService;
import es.qiu.drzug.domain.OrderItem;
import es.qiu.drzug.repository.OrderItemRepository;
import es.qiu.drzug.service.dto.OrderItemDTO;
import es.qiu.drzug.service.mapper.OrderItemMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing OrderItem.
 */
@Service
@Transactional
public class OrderItemServiceImpl implements OrderItemService{

    private final Logger log = LoggerFactory.getLogger(OrderItemServiceImpl.class);

    private final OrderItemRepository orderItemRepository;

    private final OrderItemMapper orderItemMapper;

    public OrderItemServiceImpl(OrderItemRepository orderItemRepository, OrderItemMapper orderItemMapper) {
        this.orderItemRepository = orderItemRepository;
        this.orderItemMapper = orderItemMapper;
    }

    /**
     * Save a orderItem.
     *
     * @param orderItemDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrderItemDTO save(OrderItemDTO orderItemDTO) {
        log.debug("Request to save OrderItem : {}", orderItemDTO);
        OrderItem orderItem = orderItemMapper.toEntity(orderItemDTO);
        orderItem = orderItemRepository.save(orderItem);
        return orderItemMapper.toDto(orderItem);
    }

    /**
     *  Get all the orderItems.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<OrderItemDTO> findAll(Pageable pageable) {
        log.debug("Request to get all OrderItems");
        return orderItemRepository.findAll(pageable)
            .map(orderItemMapper::toDto);
    }

    /**
     *  Get one orderItem by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OrderItemDTO findOne(UUID id) {
        log.debug("Request to get OrderItem : {}", id);
        OrderItem orderItem = orderItemRepository.findOne(id);
        return orderItemMapper.toDto(orderItem);
    }

    /**
     *  Delete the  orderItem by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(UUID id) {
        log.debug("Request to delete OrderItem : {}", id);
        orderItemRepository.delete(id);
    }
}
