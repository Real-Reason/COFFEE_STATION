package ssafy.runner.domain.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import ssafy.runner.domain.entity.QCustomerMenu;

@Repository
@RequiredArgsConstructor
public class CustomerMenuRepositoryImpl implements CustomerMenuRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Long unLikeMenu(Long customerId, Long menuId) {
        return jpaQueryFactory.delete(QCustomerMenu.customerMenu)
                .where(QCustomerMenu.customerMenu.customer.id.eq(customerId), QCustomerMenu.customerMenu.menu.id.eq(menuId))
                .execute();
    }
}
