package es.qiu.drzug.service;

import es.qiu.drzug.service.dto.OrderDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Order.
 */
public interface OrderService {

    /**
     * Save a order.
     *
     * @param orderDTO the entity to save
     * @return the persisted entity
     */
    OrderDTO save(OrderDTO orderDTO);

    /**
     *  Get all the orders.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<OrderDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" order.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    OrderDTO findOne(Long id);

    /**
     *  Delete the "id" order.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}