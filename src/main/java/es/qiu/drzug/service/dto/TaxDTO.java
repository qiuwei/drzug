package es.qiu.drzug.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the Tax entity.
 */
public class TaxDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private BigDecimal rate;

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

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TaxDTO taxDTO = (TaxDTO) o;
        if(taxDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), taxDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TaxDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", rate='" + getRate() + "'" +
            "}";
    }
}
