package ssafy.runner.domain.repository;

import ssafy.runner.domain.entity.Menu;

import java.util.List;

public interface ShopRepositoryCustom {
    List<Menu> findAllMenu();
}
