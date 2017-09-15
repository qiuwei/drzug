package es.qiu.drzug.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import es.qiu.drzug.domain.enumeration.ProductType;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "suggested_price", precision=10, scale=2)
    private BigDecimal suggestedPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private ProductType type;

    @OneToOne
    @JoinColumn(unique = true)
    private Tax sourceTax;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "product_provider",
               joinColumns = @JoinColumn(name="products_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="providers_id", referencedColumnName="id"))
    private Set<Provider> providers = new HashSet<>();

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getImage() {
        return image;
    }

    public Product image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Product imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getSuggestedPrice() {
        return suggestedPrice;
    }

    public Product suggestedPrice(BigDecimal suggestedPrice) {
        this.suggestedPrice = suggestedPrice;
        return this;
    }

    public void setSuggestedPrice(BigDecimal suggestedPrice) {
        this.suggestedPrice = suggestedPrice;
    }

    public ProductType getType() {
        return type;
    }

    public Product type(ProductType type) {
        this.type = type;
        return this;
    }

    public void setType(ProductType type) {
        this.type = type;
    }

    public Tax getSourceTax() {
        return sourceTax;
    }

    public Product sourceTax(Tax tax) {
        this.sourceTax = tax;
        return this;
    }

    public void setSourceTax(Tax tax) {
        this.sourceTax = tax;
    }

    public Set<Provider> getProviders() {
        return providers;
    }

    public Product providers(Set<Provider> providers) {
        this.providers = providers;
        return this;
    }

    public Product addProvider(Provider provider) {
        this.providers.add(provider);
        provider.getProducts().add(this);
        return this;
    }

    public Product removeProvider(Provider provider) {
        this.providers.remove(provider);
        provider.getProducts().remove(this);
        return this;
    }

    public void setProviders(Set<Provider> providers) {
        this.providers = providers;
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
        Product product = (Product) o;
        if (product.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + imageContentType + "'" +
            ", description='" + getDescription() + "'" +
            ", suggestedPrice='" + getSuggestedPrice() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
