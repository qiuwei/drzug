package es.qiu.drzug.service.mapper;

import es.qiu.drzug.domain.*;
import es.qiu.drzug.service.dto.ProductDTO;

import org.mapstruct.*;
import java.util.UUID;

/**
 * Mapper for the entity Product and its DTO ProductDTO.
 */
@Mapper(componentModel = "spring", uses = {TaxMapper.class, ProviderMapper.class, })
public interface ProductMapper extends EntityMapper <ProductDTO, Product> {

    @Mapping(source = "sourceTax.id", target = "sourceTaxId")
    @Mapping(source = "sourceTax.name", target = "sourceTaxName")
    ProductDTO toDto(Product product); 

    @Mapping(source = "sourceTaxId", target = "sourceTax")
    Product toEntity(ProductDTO productDTO); 
    default Product fromId(UUID id) {
        if (id == null) {
            return null;
        }
        Product product = new Product();
        product.setId(id);
        return product;
    }
}
