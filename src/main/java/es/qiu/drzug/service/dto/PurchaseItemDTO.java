package es.qiu.drzug.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import java.util.UUID;
import java.util.UUID;

/**
 * A DTO for the PurchaseItem entity.
 */
public class PurchaseItemDTO implements Serializable {

    private UUID id;

    @NotNull
    private Long count;

    private UUID purchaseId;

    private UUID productId;

    private String productName;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public UUID getPurchaseId() {
        return purchaseId;
    }

    public void setPurchaseId(UUID purchaseId) {
        this.purchaseId = purchaseId;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(UUID productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PurchaseItemDTO purchaseItemDTO = (PurchaseItemDTO) o;
        if(purchaseItemDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), purchaseItemDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PurchaseItemDTO{" +
            "id=" + getId() +
            ", count='" + getCount() + "'" +
            "}";
    }
}
