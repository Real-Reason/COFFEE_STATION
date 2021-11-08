package ssafy.runner.domain.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import ssafy.runner.domain.entity.Shop;

import java.util.List;

import static ssafy.runner.domain.entity.QShop.shop;

@Repository
@RequiredArgsConstructor
public class ShopRepositoryImpl implements ShopRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Shop> searchShop(String searchWord) {
        return jpaQueryFactory
                .select(shop)
                .from(shop)
                .where(shop.name.contains(searchWord))
                .fetch();
    }
}
