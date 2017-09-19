package es.qiu.drzug.repository;

import es.qiu.drzug.domain.Tax;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.UUID;


/**
 * Spring Data JPA repository for the Tax entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaxRepository extends JpaRepository<Tax, UUID> {

}
