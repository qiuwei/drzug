package es.qiu.drzug.service;

import es.qiu.drzug.service.dto.PaymentDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

/**
 * Service Interface for managing Payment.
 */
public interface PaymentService {

    /**
     * Save a payment.
     *
     * @param paymentDTO the entity to save
     * @return the persisted entity
     */
    PaymentDTO save(PaymentDTO paymentDTO);

    /**
     *  Get all the payments.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<PaymentDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" payment.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    PaymentDTO findOne(UUID id);

    /**
     *  Delete the "id" payment.
     *
     *  @param id the id of the entity
     */
    void delete(UUID id);
}
