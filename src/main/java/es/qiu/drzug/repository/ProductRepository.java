package es.qiu.drzug.repository;

import es.qiu.drzug.domain.Product;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.UUID;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    @Query("select distinct product from Product product left join fetch product.providers")
    List<Product> findAllWithEagerRelationships();

    @Query("select product from Product product left join fetch product.providers where product.id =:id")
    Product findOneWithEagerRelationships(@Param("id") UUID id);

}
