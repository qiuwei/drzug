package es.qiu.drzug.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import java.util.UUID;
import java.util.UUID;
import javax.persistence.Lob;
import es.qiu.drzug.domain.enumeration.ProductType;
import lombok.Data;

/**
 * A DTO for the Product entity.
 */
@Data
public class ProductDTO implements Serializable {

    private UUID id;

    @NotNull
    private String name;

    @Lob
    private byte[] image;
    private String imageContentType;

    @Lob
    private String description;

    private BigDecimal suggestedPrice;

    private ProductType type;

    private UUID sourceTaxId;

    private String sourceTaxName;

    private Set<ProviderDTO> providers = new HashSet<>();

}
