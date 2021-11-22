package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.customer.order.detail.OrderDetailResDto;
import ssafy.runner.domain.dto.order.OrderResponseDto;
import ssafy.runner.domain.dto.order.OrderUpdateRequestDto;
import ssafy.runner.domain.entity.*;
import ssafy.runner.domain.enums.OrderStatus;
import ssafy.runner.domain.repository.*;
import ssafy.runner.firebase.FirebaseCloudMessageService;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PartnerOrderService {

    private final OrderRepository orderRepository;
    private final PartnerRepository partnerRepository;
    private final CustomerRepository customerRepository;
    private final ShopRepository shopRepository;
    private final FirebaseCloudMessageService firebaseCloudMessageService;
    private final OrderMenuRepository orderMenuRepository;

    // 해당 샵의 전체 주문 내역 조회
    public List<OrderDetailResDto> findByShop(String email) {
        Shop shop = shopRepository.findShopByEmail(email).orElseThrow(NoSuchElementException::new);
        // 해당 샵의 주문 리스트 뽑기
        // 3개월 이내 옵션 걸어야함
        List<Orders> orderList = orderRepository.findByShop(shop);

        // 응답할 디티오 리스트에 담기
//        List<OrderResponseDto> orderDtoList = new ArrayList<>();
        List<OrderDetailResDto> orderDetailResDtoList = new ArrayList<>();
        for (Orders order : orderList) {
//            orderDtoList.add(new OrderResponseDto(order));
            List<OrderMenu> orderMenuList = orderMenuRepository.findOneFetched(order.getId());
            OrderDetailResDto orderDetailResDto = OrderDetailResDto.of(orderMenuList);
            orderDetailResDtoList.add(orderDetailResDto);
        }
        return orderDetailResDtoList;
    }

    // 해당 샵의 특정시간 이후 주문 내역 조회
    public List<OrderResponseDto> findByShopAndDay(String email, LocalDateTime dateTime) {

        Shop shop = shopRepository.findShopByEmail(email).orElseThrow(NoSuchElementException::new);
        LocalDateTime todayStart = startDateTime(dateTime);
        List<Orders> orderList = orderRepository.findByShopAndDateAfter(shop, todayStart);
        List<OrderResponseDto> orderDtoList = new ArrayList<>();
        for (Orders order : orderList) {
            orderDtoList.add(new OrderResponseDto(order));
        }
        return orderDtoList;
    }

    // 해당 샵의 특정시간 이후 주문 내역 상태별 조회
    public List<OrderDetailResDto> findByShopAndDayAndStatus(String email, LocalDateTime dateTime, String status) {

        Shop shop = shopRepository.findShopByEmail(email).orElseThrow(NoSuchElementException::new);
        LocalDateTime todayStart = startDateTime(dateTime);
        OrderStatus orderStatus = OrderStatus.valueOf(status);
        List<Long> orderList = orderRepository.findIdByShopAndDateAfterAndStatus(shop, todayStart, orderStatus);
        List<OrderDetailResDto> orderDetailResDtoList = new ArrayList<>();
        if (orderList.size() > 0) {
            for (Long orderId : orderList) {
                List<OrderMenu> orderMenuList = orderMenuRepository.findOneFetched(orderId);
                OrderDetailResDto orderDetailResDto = OrderDetailResDto.of(orderMenuList);
                orderDetailResDtoList.add(orderDetailResDto);
            }
        }
        return orderDetailResDtoList;
    }

    @Transactional
    public OrderResponseDto modifyStatus(Long orderId, OrderUpdateRequestDto orderUpdateRequestDto) throws IOException {

        Orders order = orderRepository.findOrderNCustomerById(orderId)
                .orElseThrow(NoSuchElementException::new);
        OrderStatus enumStatus = OrderStatus.from(orderUpdateRequestDto.getStatus());

        // firebase Token 가져오기
        Long customerId = order.getCustomer().getId();
        Customer customer = customerRepository.findById(customerId).orElseThrow(NoSuchElementException::new);
        String firebaseToken = customer.getFirebaseToken();

        if (enumStatus == OrderStatus.PREPARING){
            System.out.println("메뉴 수락했습니다.=========================================");
            System.out.println("firebaseToken ====================================== " + firebaseToken);
            firebaseCloudMessageService.sendMessageTo(firebaseToken, "COFFEE_STATION", "주문을 수락했습니다." +
                    "메뉴를 준비중입니다.", orderId);
        } else if (enumStatus == OrderStatus.REJECT) {
            System.out.println("메뉴 거절했습니다.");
            firebaseCloudMessageService.sendMessageTo(firebaseToken, "COFFEE_STATION", "매장의 사정으로 주문이 거절되었습니다.", orderId);
        } else if (enumStatus == OrderStatus.ORDERED) {
            System.out.println("메뉴 준비완료 했습니다.");
            firebaseCloudMessageService.sendMessageTo(firebaseToken, "COFFEE_STATION", "메뉴 준비가 완료되었어요!" +
                    "픽업 부탁드려요", orderId);
        } else if (enumStatus == OrderStatus.COMPLETED) {
            System.out.println("메뉴 픽업 완료했습니다. ====================================");
            System.out.println("firebaseToken ====================================== " + firebaseToken);
            firebaseCloudMessageService.sendMessageTo(firebaseToken, "COFFEE_STATION", "이용해 주셔서 감사합니다. 다음에 또 이용해주세요.", orderId);
        }
//        firebaseCloudMessageService.sendMessageTo(Token, Title, body, orderId);

        order.modifyOrderStatus(enumStatus);  // 현재 이 코드가 메뉴 상태 변경
        return new OrderResponseDto(order);
    }

    public int calPeriodRevenue(String email, LocalDateTime from, LocalDateTime to) {

        Partner partner = partnerRepository.findByEmailWithShop(email)
                .orElseThrow(NoSuchElementException::new);
        Shop shop = partner.getShop();
        LocalDateTime start = startDateTime(from);
        LocalDateTime end = endDateTime(to);
        Integer totalPrices = orderRepository.findRevenueListByDays(shop, start, end, OrderStatus.COMPLETED);
        return totalPrices == null ? 0 : totalPrices;
    }

    public int calTotalRevenue(String email, LocalDateTime now) {
        Partner partner = partnerRepository.findByEmailWithShop(email)
                .orElseThrow(NoSuchElementException::new);
        Shop shop = partner.getShop();
        Integer totalPrices =  orderRepository.findTotalRevenue(shop, OrderStatus.COMPLETED);
        return totalPrices == null ? 0 : totalPrices;
    }

    private LocalDateTime startDateTime(LocalDateTime dateTime) {
        return LocalDateTime.of(dateTime.toLocalDate(), LocalTime.of(0,0,0));
    }

    private LocalDateTime endDateTime(LocalDateTime dateTime) {
        return LocalDateTime.of(dateTime.toLocalDate(), LocalTime.of(23,59,59));
    }
}
