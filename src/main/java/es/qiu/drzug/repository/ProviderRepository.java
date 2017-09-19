package es.qiu.drzug.repository;

import es.qiu.drzug.domain.Provider;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.UUID;


/**
 * Spring Data JPA repository for the Provider entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProviderRepository extends JpaRepository<Provider, UUID> {

}
