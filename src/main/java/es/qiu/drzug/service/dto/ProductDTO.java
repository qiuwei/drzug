package es.qiu.drzug.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;
import es.qiu.drzug.domain.enumeration.ProductType;

/**
 * A DTO for the Product entity.
 */
public class ProductDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @Lob
    private byte[] image;
    private String imageContentType;

    @Lob
    private String description;

    private BigDecimal suggestedPrice;

    private ProductType type;

    private Long sourceTaxId;

    private String sourceTaxName;

    private Set<ProviderDTO> providers = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getSuggestedPrice() {
        return suggestedPrice;
    }

    public void setSuggestedPrice(BigDecimal suggestedPrice) {
        this.suggestedPrice = suggestedPrice;
    }

    public ProductType getType() {
        return type;
    }

    public void setType(ProductType type) {
        this.type = type;
    }

    public Long getSourceTaxId() {
        return sourceTaxId;
    }

    public void setSourceTaxId(Long taxId) {
        this.sourceTaxId = taxId;
    }

    public String getSourceTaxName() {
        return sourceTaxName;
    }

    public void setSourceTaxName(String taxName) {
        this.sourceTaxName = taxName;
    }

    public Set<ProviderDTO> getProviders() {
        return providers;
    }

    public void setProviders(Set<ProviderDTO> providers) {
        this.providers = providers;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProductDTO productDTO = (ProductDTO) o;
        if(productDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", image='" + getImage() + "'" +
            ", description='" + getDescription() + "'" +
            ", suggestedPrice='" + getSuggestedPrice() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
