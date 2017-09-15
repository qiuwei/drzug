package es.qiu.drzug.service.impl;

import es.qiu.drzug.service.OrderService;
import es.qiu.drzug.domain.Order;
import es.qiu.drzug.repository.OrderRepository;
import es.qiu.drzug.service.dto.OrderDTO;
import es.qiu.drzug.service.mapper.OrderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Order.
 */
@Service
@Transactional
public class OrderServiceImpl implements OrderService{

    private final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);

    private final OrderRepository orderRepository;

    private final OrderMapper orderMapper;

    public OrderServiceImpl(OrderRepository orderRepository, OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
    }

    /**
     * Save a order.
     *
     * @param orderDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrderDTO save(OrderDTO orderDTO) {
        log.debug("Request to save Order : {}", orderDTO);
        Order order = orderMapper.toEntity(orderDTO);
        order = orderRepository.save(order);
        return orderMapper.toDto(order);
    }

    /**
     *  Get all the orders.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<OrderDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Orders");
        return orderRepository.findAll(pageable)
            .map(orderMapper::toDto);
    }

    /**
     *  Get one order by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OrderDTO findOne(Long id) {
        log.debug("Request to get Order : {}", id);
        Order order = orderRepository.findOne(id);
        return orderMapper.toDto(order);
    }

    /**
     *  Delete the  order by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Order : {}", id);
        orderRepository.delete(id);
    }
}
