package ssafy.runner;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.entity.Customer;
import ssafy.runner.domain.entity.Partner;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.enums.ShopStatus;
import ssafy.runner.domain.enums.SnsType;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;

@Component
@RequiredArgsConstructor
public class InitDB {
    private final InitService initService;

    // 패키지 로딩 시점에 자동실행 (스프링 빈 등록될 때 자동 실행?)
    @PostConstruct
    public void init() {
        for (int i = 0; i < 10; i++) {
            initService.initPartnerAndShop(i);
            initService.initCustomer(i);
        }
    }


    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {
        private final EntityManager em;

        public void initPartnerAndShop(int i) {
            Partner partner = new Partner("wns312"+i+"@naver.com", "password"+i);
            em.persist(partner);
            Shop shop = Shop.builder()
                .partner(partner).name("가게"+i)
                .business_no("000000000"+i).phone_number("010-1234-567"+i)
                .address("서울 성동구 마장동").detail_address("1234번지 10"+i+"호")
                .zip_code("1234"+i).x("123.456"+i).y("321.456"+i)
                .status(ShopStatus.READY).open_at("오전10시").close_at("오후10시")
                .intro("소개글"+i).instagram("인스타주소"+i)
                .build();
            em.persist(shop);
        }

        public void initCustomer(int i) {
            Customer customer = new Customer("wns312"+i+"@naver.com", "password"+i, "닉네임"+i);
            em.persist(customer);
        }



    }
}
