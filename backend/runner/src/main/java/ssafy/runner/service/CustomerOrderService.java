package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.customer.CustomerOrderResponseDto;
import ssafy.runner.domain.dto.customer.order.detail.OrderDetailResDto;
import ssafy.runner.domain.dto.order.OrderMenuRequestDto;
import ssafy.runner.domain.dto.order.OrderRequestDto;
import ssafy.runner.domain.dto.order.OrderResponseDto;
import ssafy.runner.domain.entity.*;
import ssafy.runner.domain.enums.OrderStatus;
import ssafy.runner.domain.repository.*;
import ssafy.runner.firebase.FirebaseCloudMessageService;

import javax.persistence.criteria.Order;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomerOrderService {

    private final OrderRepository orderRepository;
    private final OrderMenuRepository orderMenuRepository;

    private final CustomerRepository customerRepository;
    private final PartnerRepository partnerRepository;

    private final ShopRepository shopRepository;
    private final ShopImageRepository shopImageRepository;
    private final MenuRepository menuRepository;
    private final MenuSizeRepository menuSizeRepository;
    private final ExtraRepository extraRepository;
    private final OrderMenuExtraRepository orderMenuExtraRepository;

    private final FirebaseCloudMessageService firebaseCloudMessageService;

    @Transactional
    public List<CustomerOrderResponseDto> findOrdersByCustomer(String email) {
        Customer customer = customerRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
        List<Orders> orderList = orderRepository.findByCustomer(customer);
        List<CustomerOrderResponseDto> dtoList = new ArrayList<>();
        orderList.forEach(o->{
            Long shopId = o.getShop().getId();
            String shopImgUrl = shopImageRepository.findByShopIdAndIndex(shopId, 1).orElseThrow(NoSuchElementException::new);
//            String shopImgUrl = shopImage.getImgUrl();
            dtoList.add(CustomerOrderResponseDto.of(o, shopImgUrl));
        });
        Collections.reverse(dtoList);
        return dtoList;
    }

    // 주문 상세 내역 조회하기
    @Transactional
    public OrderDetailResDto findOneOrder(String email, Long orderId) {
        // orderId로 오더메뉴 페치해서 가져오기
        List<OrderMenu> orderMenuList = orderMenuRepository.findOneFetched(orderId);


//        System.out.println("===============조회시작====================");
        orderMenuList.forEach(orderMenu->{
//            System.out.println("===============조회시작-inner====================");
            Orders order = orderMenu.getOrder();
            List<OrderMenuExtra> orderMenuExtras = orderMenu.getOrderMenuExtras();
            Menu menu = orderMenu.getMenu();
            MenuSize menuSize = orderMenu.getMenuSize();

//            System.out.println("orderMenuList = " + orderMenuList);
//            System.out.println("orderMenu = " + orderMenu);
//            System.out.println("order = " + order);
//            System.out.println("orderMenuExtras = " + orderMenuExtras);
//            System.out.println("menu = " + menu);
//            System.out.println("menuSize = " + menuSize);
//            // 여기부터는 N+1이 발생할 것 같은 쿼리
//            System.out.println("Size = " + menuSize.getSize().getId());
//            System.out.println("Size = " + menuSize.getSize().getType());
            orderMenuExtras.forEach(ome->{
//                System.out.println("orderMenuExtra = "+ome.getExtra().getId());
//                System.out.println("orderMenuExtra = "+ome.getExtra().getName());
            });
            // N+1이 발생할 것 같은 쿼리 종료

//            System.out.println("===============조회종료-inner====================");

        });
//        System.out.println("===============조회종료====================");
        // 분해조립해서 알맞은 dto로 만들어주어야 함
        return OrderDetailResDto.of(orderMenuList);
    }

    @Transactional
    public OrderResponseDto order(String email, Long shopId, OrderRequestDto params) {

        // Order 객체 생성 및 저장
        Customer customer = customerRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
        Shop shop = shopRepository.findById(shopId).orElseThrow(NoSuchElementException::new);
        Orders orders = new Orders(shop, customer, OrderStatus.ORDERED, 0, params.getRequest());
        orderRepository.save(orders);
        int totalPrice = 0;

        List<OrderMenuRequestDto> orderMenuListDto = params.getOrderMenuList();
        for (OrderMenuRequestDto orderMenuDto : orderMenuListDto) {
            // orderMenuDto를 기반으로한 OrderMenu 객체 생성
            Menu menu = menuRepository.findById(orderMenuDto.getMenuId()).orElseThrow(NoSuchElementException::new);
            MenuSize menuSize = menuSizeRepository.findById(orderMenuDto.getMenuSizeId()).orElseThrow(NoSuchElementException::new);
            OrderMenu orderMenu = new OrderMenu(orders, menu, menuSize, orderMenuDto.getQuantity(),0);
            orderMenuRepository.save(orderMenu);
            int orderMenuPrice = menu.getPrice();

            for (Long extraId : orderMenuDto.getExtraIdList()) {
                // 해당 extra 찾고, OrderMenuExtra 객체 생성 및 저장
                Extra extra = extraRepository.findById(extraId).orElseThrow(NoSuchElementException::new);
                OrderMenuExtra orderMenuExtra = new OrderMenuExtra(orderMenu, extra);
                orderMenuExtraRepository.save(orderMenuExtra);
                orderMenuPrice += extra.getPrice();
            }

            // orderMenu
            orderMenuPrice = orderMenuPrice * orderMenuDto.getQuantity();  // quantity 곱해주기
            orderMenu.modifyOrderMenuPrice(orderMenuPrice); // orderMenu price 변경/업데이트
            totalPrice += orderMenuPrice;  // order 전체가격(totalPrice)에 orderMenu price 더해주기
        }

        // order totalPrice 변경
        orders.modifyOrderPrice(totalPrice);

        // OrderResponseDto 객체 반환
        return new OrderResponseDto(orders);
    }

    public void paidFcm(Long orderId) throws IOException {
        System.out.println("이제 보낸다!");
        // shop을 fetch join으로 같이 가져오기
        Orders order = orderRepository.findOrderNShopById(orderId).orElseThrow(NoSuchElementException::new);
        List<OrderMenu> menuList = orderMenuRepository.findOneSimpleById(orderId);
        int menuListSize = menuList.size();
        String menuName = menuList.get(0).getMenu().getName();

        Long shopId = order.getShop().getId();
        Shop shop = shopRepository.findShopNPartnerById(shopId).orElseThrow(NoSuchElementException::new);
        String firebaseToken = shop.getPartner().getFirebaseToken();
//        String firebaseToken = partner.getFirebaseToken();
        firebaseCloudMessageService.sendMessageTo(firebaseToken, "COFFEE_STATION", menuName + " 외 " + menuListSize + "건의 주문이 접수되었습니다.", orderId);
    }
}
