package es.qiu.drzug.service;

import es.qiu.drzug.service.dto.OrderItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing OrderItem.
 */
public interface OrderItemService {

    /**
     * Save a orderItem.
     *
     * @param orderItemDTO the entity to save
     * @return the persisted entity
     */
    OrderItemDTO save(OrderItemDTO orderItemDTO);

    /**
     *  Get all the orderItems.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<OrderItemDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" orderItem.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    OrderItemDTO findOne(Long id);

    /**
     *  Delete the "id" orderItem.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
