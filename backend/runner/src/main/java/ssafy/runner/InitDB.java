package ssafy.runner;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.entity.*;
import ssafy.runner.domain.enums.MenuStatus;
import ssafy.runner.domain.enums.OrderStatus;
import ssafy.runner.domain.enums.ShopStatus;
import ssafy.runner.domain.enums.SizeType;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class InitDB {
    private final InitService initService;

    // 패키지 로딩 시점에 자동실행 (스프링 빈 등록될 때 자동 실행?)
    @PostConstruct
    public void init() {
        Customer customerZero = initService.initCustomer(0);
        for (int i = 1; i <= 10; i++) {
            Shop shop = initService.initPartnerAndShop(i);
            Customer customer = initService.initCustomer(i);
            Category category = initService.initCategory(i);
            initService.initMenu(i, shop, category);
            initService.initOrder(shop, customerZero, OrderStatus.PAID, 30000);
        }
        initService.initSize();
    }


    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {
        private final EntityManager em;

        public Shop initPartnerAndShop(int i) {
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
            return shop;
        }

        public Customer initCustomer(int i) {
            Customer customer = new Customer("wns312"+i+"@naver.com", "password"+i, "닉네임"+i);
            em.persist(customer);
            return customer;
        }


        public Category initCategory(int i) {
            Category category = new Category("카테고리" + i);
            em.persist(category);
            return category;
        }

        public void initMenu(int i, Shop shop, Category category) {
            Menu menu = Menu.builder()
                .shop(shop)
                .category(category)
                .name("아메리카노"+i)
                .imgUrl("메뉴이미지"+i)
                .isSignature(i%2 == 1 ? true : false)
                .price((i+1)*1000)
                .menuStatus(MenuStatus.NOT_SALE)
                .build();
            em.persist(menu);
        }

        public void initOrder(Shop shop, Customer customer, OrderStatus status, int totalPrice) {
            Orders order = Orders.builder()
                    .date(LocalDateTime.now())
                    .shop(shop)
                    .customer(customer)
                    .status(status)
                    .totalPrice(totalPrice)
                    .build();
            em.persist(order);
        }

        public void initSize() {
            em.persist(new Size(SizeType.S));
            em.persist(new Size(SizeType.M));
            em.persist(new Size(SizeType.L));
            em.persist(new Size(SizeType.Tall));
            em.persist(new Size(SizeType.Grande));
            em.persist(new Size(SizeType.Venti));
            em.persist(new Size(SizeType.Regular));
            em.persist(new Size(SizeType.Large));
            em.persist(new Size(SizeType.OneLiter));
            em.persist(new Size(SizeType.OneSize));
        }
    }
}
