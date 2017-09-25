package es.qiu.drzug.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;

/**
 * A InvoiceItem.
 */
@Entity
@Table(name = "invoice_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class InvoiceItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private UUID id;

    @NotNull
    @Column(name = "count", nullable = false)
    private Long count;

    @Column(name = "discount", precision=10, scale=2)
    private BigDecimal discount;

    @ManyToOne
    private Invoice invoice;

    @OneToOne
    @JoinColumn(unique = true)
    private Product product;

    @OneToOne
    @JoinColumn(unique = true)
    private Tax tax;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Long getCount() {
        return count;
    }

    public InvoiceItem count(Long count) {
        this.count = count;
        return this;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public InvoiceItem discount(BigDecimal discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public InvoiceItem invoice(Invoice invoice) {
        this.invoice = invoice;
        return this;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }

    public Product getProduct() {
        return product;
    }

    public InvoiceItem product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Tax getTax() {
        return tax;
    }

    public InvoiceItem tax(Tax tax) {
        this.tax = tax;
        return this;
    }

    public void setTax(Tax tax) {
        this.tax = tax;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        InvoiceItem invoiceItem = (InvoiceItem) o;
        if (invoiceItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), invoiceItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InvoiceItem{" +
            "id=" + getId() +
            ", count='" + getCount() + "'" +
            ", discount='" + getDiscount() + "'" +
            "}";
    }
}
