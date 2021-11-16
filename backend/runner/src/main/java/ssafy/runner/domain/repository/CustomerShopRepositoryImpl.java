package ssafy.runner.domain.repository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import ssafy.runner.domain.entity.QCustomerShop;

@Repository
@RequiredArgsConstructor
public class CustomerShopRepositoryImpl implements CustomerShopRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public long unLikeShop(Long customerId, Long shopId) {
        return jpaQueryFactory.delete(QCustomerShop.customerShop)
                .where(QCustomerShop.customerShop.customer.id.eq(customerId), QCustomerShop.customerShop.shop.id.eq(shopId))
                .execute();

//        return null;
    }
}
