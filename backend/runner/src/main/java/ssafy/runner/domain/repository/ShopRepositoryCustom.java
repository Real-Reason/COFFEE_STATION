package ssafy.runner.domain.repository;

import ssafy.runner.domain.entity.Shop;

import java.util.List;

public interface ShopRepositoryCustom {

    List<Shop> searchShop(String searchWord);
}
