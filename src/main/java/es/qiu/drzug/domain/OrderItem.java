package es.qiu.drzug.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A OrderItem.
 */
@Entity
@Table(name = "order_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrderItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "count", nullable = false)
    private Long count;

    @Column(name = "sale_price", precision=10, scale=2)
    private BigDecimal salePrice;

    @ManyToOne
    private Product product;

    @ManyToOne
    private Order order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCount() {
        return count;
    }

    public OrderItem count(Long count) {
        this.count = count;
        return this;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public BigDecimal getSalePrice() {
        return salePrice;
    }

    public OrderItem salePrice(BigDecimal salePrice) {
        this.salePrice = salePrice;
        return this;
    }

    public void setSalePrice(BigDecimal salePrice) {
        this.salePrice = salePrice;
    }

    public Product getProduct() {
        return product;
    }

    public OrderItem product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Order getOrder() {
        return order;
    }

    public OrderItem order(Order order) {
        this.order = order;
        return this;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        OrderItem orderItem = (OrderItem) o;
        if (orderItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderItem{" +
            "id=" + getId() +
            ", count='" + getCount() + "'" +
            ", salePrice='" + getSalePrice() + "'" +
            "}";
    }
}
