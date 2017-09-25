package es.qiu.drzug.service;

import es.qiu.drzug.service.dto.OrderItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

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
    OrderItemDTO save(OrderItemDTO orderItemDTO, UUID orderId);


    /**
     *  Get the "id" orderItem.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    OrderItemDTO findOne(UUID id);

    /**
     *  Delete the "id" orderItem.
     *
     *  @param id the id of the entity
     */
    void delete(UUID id);


    /**
     *  Get all the orderItems by orderId
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<OrderItemDTO> findAllByOrder_Id(Pageable pageable, UUID orderId);
}
