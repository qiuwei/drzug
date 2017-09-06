package es.qiu.drzug.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Storage entity.
 */
public class StorageDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StorageDTO storageDTO = (StorageDTO) o;
        if(storageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), storageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StorageDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
