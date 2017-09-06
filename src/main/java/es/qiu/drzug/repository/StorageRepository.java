package es.qiu.drzug.repository;

import es.qiu.drzug.domain.Storage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Storage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StorageRepository extends JpaRepository<Storage,Long> {
    
}
