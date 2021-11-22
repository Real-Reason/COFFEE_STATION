package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.runner.domain.entity.Menu;
import ssafy.runner.domain.entity.MenuSize;

import java.util.Optional;

public interface MenuSizeRepository extends JpaRepository<MenuSize, Long> {

    @Query(value="select ms from MenuSize ms where ms.menu.id = :menuId and ms.size.id = :sizeId")
    Optional<MenuSize> findByMenuAndSize(@Param("menuId") Long menuId, @Param("sizeId") Long sizeId);
}
