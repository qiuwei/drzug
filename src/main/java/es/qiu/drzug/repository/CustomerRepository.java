package es.qiu.drzug.repository;

import es.qiu.drzug.domain.Customer;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.UUID;


/**
 * Spring Data JPA repository for the Customer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerRepository extends JpaRepository<Customer, UUID> {

}
