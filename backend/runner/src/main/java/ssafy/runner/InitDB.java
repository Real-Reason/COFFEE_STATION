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
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class InitDB {
    private final InitService initService;

    // 패키지 로딩 시점에 자동실행 (스프링 빈 등록될 때 자동 실행?)
    @PostConstruct
    public void init() {
        List<Size> sizeList = initService.initSize(); // 사이즈 다만듬
        List<Customer> customerList = initService.initCustomer(); // 손님 10개만듬
        List<Shop> shopList = initService.initPartnerAndShop(); // 가게 열, 파트너 열 만듬
        List<Category> categoryList = initService.initCategory();// 카테고리 하나만듬
        List<Menu> menuList = initService.initMenu(shopList, categoryList);// 안에서 메뉴 10개만듬
        List<MenuSize> menuSizeList = initService.initMenuSize(menuList, sizeList); // 가게 10개, 가게에 메뉴 10개, 메뉴당 사이즈 10개 -> 1000개
        List<Extra> extraList = initService.initExtra(menuList);  // 엑스트라도 만들자 : 메뉴랑 엮임, 메뉴당 10개 -> 1000개
        // 손님, 파트너, 매장, 메뉴, 사이즈, 카테고리 완료 : 메뉴사이즈는 메뉴랑 같이 만들어야함
        // 메뉴사이즈(메뉴와 사이즈 필요), 엑스트라, 오더, 오더메뉴, 오더메뉴엑스트라 만들어야함
        initService.initOrder(shopList, customerList, menuSizeList, extraList);

    }


    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {
        private final EntityManager em;


        public void initOrder(List<Shop> shopList, List<Customer> customerList, List<MenuSize> menuSizeList, List<Extra> extraList) {
            // 1. order 만들기

            for (int i = 0; i < 10; i++) {
                Orders order = Orders.builder()
                    .date(LocalDateTime.now())
                    .shop(shopList.get(i))
                    .customer(customerList.get(i))
                    .status(OrderStatus.PAID)
                    .totalPrice(1000*(i+1))
                    .request("없음")
                    .build();
                em.persist(order);
            }
            em.flush();
            em.clear();

            // 2. orderMenu 만들기
            // OrderMenu(Orders order, Menu menu, MenuSize menuSize, int quantity)
            for (long i = 1; i <= 10; i++) {
                List<Orders> orderList = em.createQuery("select o from Orders o where o.shop.id=:shopId", Orders.class)
                    .setParameter("shopId", i)
                    .getResultList();
                List<Menu> menuList = em.createQuery("select m from Menu m where m.shop.id=:shopId", Menu.class)
                    .setParameter("shopId", i)
                    .getResultList();
                for (int j = 0; j < 10; j++) {
                    OrderMenu orderMenu = OrderMenu.builder()
                        .order(orderList.get(0)) // 같은 오더
                        .menu(menuList.get(j)) // 메뉴는 다르게
                        .menuSize(menuSizeList.get(j)) // 사이즈는 다 다르게
                        .quantity(j+1)
                        .build();
                    em.persist(orderMenu);
                }
            }
            em.flush();
            em.clear();
            // 3. orderMenuExtra 만들기 public OrderMenuExtra(OrderMenu orderMenu, Extra extra) {
            for (long i = 1; i <= 10; i++) {
                List<OrderMenu> orderMenuList = em.createQuery("select om from OrderMenu om" +
                    " join fetch om.order" +
                    " join fetch om.menu" +
                    " join fetch om.menuSize" +
                    " where om.order.id=:orderId", OrderMenu.class)
                    .setParameter("orderId", i)
                    .getResultList();
                System.out.println(orderMenuList.size());
                for (int j = 0; j < 10; j++) {
                    OrderMenuExtra orderMenuExtra = new OrderMenuExtra(orderMenuList.get(j), extraList.get(j));
                    em.persist(orderMenuExtra);
                }

            }

        }

        public List<Shop> initPartnerAndShop() {
            List<Shop> shopList = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
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
                shopList.add(shop);
            }

            return shopList;
        }

        public List<Customer> initCustomer() {
            List<Customer> customerList = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Customer customer = new Customer("wns312"+i+"@naver.com", "password"+i, "닉네임"+i);
                em.persist(customer);
                customerList.add(customer);
            }
            return customerList;
        }


        public List<Category> initCategory() {
            List<Category> categoryList = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Category category = new Category("카테고리" + i);
                em.persist(category);
                categoryList.add(category);
            }
            return categoryList;
        }

        public List<Menu> initMenu(List<Shop> shopList, List<Category> categoryList) {
            List<Menu> menuList = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                for (int j = 0; j < 10; j++) {
                    Menu menu = Menu.builder()
                        .shop(shopList.get(i))
                        .category(categoryList.get(j))
                        .name("아메리카노"+j)
                        .imgUrl("메뉴이미지"+j)
                        .isSignature(j%2 == 1)
                        .price((j+1)*1000)
                        .menuStatus(MenuStatus.NOT_SALE)
                        .build();
                    em.persist(menu);
                    menuList.add(menu);
                }
            }
            return menuList;
        }



        public List<Size> initSize() {
            List<Size> sizeList = new ArrayList<>();
            Size size0 = new Size(SizeType.S);
            Size size1 = new Size(SizeType.M);
            Size size2 = new Size(SizeType.L);
            Size size3 = new Size(SizeType.Tall);
            Size size4 = new Size(SizeType.Grande);
            Size size5 = new Size(SizeType.Venti);
            Size size6 = new Size(SizeType.Regular);
            Size size7 = new Size(SizeType.Large);
            Size size8 = new Size(SizeType.OneLiter);
            Size size9 = new Size(SizeType.OneSize);
            em.persist(size0);
            em.persist(size1);
            em.persist(size2);
            em.persist(size3);
            em.persist(size4);
            em.persist(size5);
            em.persist(size6);
            em.persist(size7);
            em.persist(size8);
            em.persist(size9);
            sizeList.add(size0);
            sizeList.add(size1);
            sizeList.add(size2);
            sizeList.add(size3);
            sizeList.add(size4);
            sizeList.add(size5);
            sizeList.add(size6);
            sizeList.add(size7);
            sizeList.add(size8);
            sizeList.add(size9);
            return sizeList;
        }

        public List<MenuSize> initMenuSize(List<Menu> menuList, List<Size> sizeList) {
            List<MenuSize> menuSizeList = new ArrayList<>();
            for (int k = 0; k < 10; k++) {
                for (int i = 0; i < 10; i++) {
                    for (int j = 0; j < 10; j++) {
                        MenuSize menuSize = new MenuSize(menuList.get(i), sizeList.get(j), (i + 1) * 100);
                        em.persist(menuSize);
                        menuSizeList.add(menuSize);
                    }
                }
            }

            return menuSizeList;
        }

        public List<Extra> initExtra(List<Menu> menuList) {
            List<Extra> extraList = new ArrayList<>();
            for (int k = 0; k < 10; k++) {
                for (int i = 0; i < 10; i++) {
                    for (int j = 0; j < 10; j++) {
                        Extra extra = new Extra(menuList.get(j), "엑스트라" + j, 100 * (j + 1));
                        em.persist(extra);
                        extraList.add(extra);
                    }
                }
            }
            return extraList;
        }
    }
}
