package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.order.OrderResponseDto;
import ssafy.runner.domain.dto.order.OrderUpdateRequestDto;
import ssafy.runner.domain.entity.Orders;
import ssafy.runner.domain.entity.Partner;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.enums.OrderStatus;
import ssafy.runner.domain.repository.OrderRepository;
import ssafy.runner.domain.repository.PartnerRepository;

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

    public List<OrderResponseDto> findAll(String email) {

        Partner partner = partnerRepository.findByEmailWithShop(email)
            .orElseThrow(NoSuchElementException::new);
        List<Orders> orderList = orderRepository.findAll();
        List<OrderResponseDto> orderDtoList = new ArrayList<>();
        for (Orders order : orderList) {
            orderDtoList.add(new OrderResponseDto(order));
        }
        return orderDtoList;
    }

    // 해당 샵의 전체 주문 내역 조회
    public List<OrderResponseDto> findByShop(String email) {

        Partner partner = partnerRepository.findByEmailWithShop(email)
                .orElseThrow(NoSuchElementException::new);
        Shop shop = partner.getShop();
        // 해당 샵의 주문 리스트 뽑기
        List<Orders> orderList = orderRepository.findByShop(shop);
        // 응답할 디티오 리스트에 담기
        List<OrderResponseDto> orderDtoList = new ArrayList<>();
        for (Orders order : orderList) {
            orderDtoList.add(new OrderResponseDto(order));
        }
        return orderDtoList;
    }

    // 해당 샵의 특정시간 이후 주문 내역 조회
    public List<OrderResponseDto> findByShopAndDay(String email, LocalDateTime dateTime) {

        Partner partner = partnerRepository.findByEmailWithShop(email)
                .orElseThrow(NoSuchElementException::new);
        Shop shop = partner.getShop();
        LocalDateTime todayStart = startDateTime(dateTime);
        List<Orders> orderList = orderRepository.findByShopAndDateAfter(shop, todayStart);
        List<OrderResponseDto> orderDtoList = new ArrayList<>();
        for (Orders order : orderList) {
            orderDtoList.add(new OrderResponseDto(order));
        }
        return orderDtoList;
    }

    // 해당 샵의 특정시간 이후 주문 내역 상태별 조회
    public List<OrderResponseDto> findByShopAndDayAndStatus(String email, LocalDateTime dateTime, String status) {

        Partner partner = partnerRepository.findByEmailWithShop(email)
                .orElseThrow(NoSuchElementException::new);
        Shop shop = partner.getShop();
        LocalDateTime todayStart = startDateTime(dateTime);
        OrderStatus orderStatus = OrderStatus.valueOf(status);
        List<Orders> orderList = orderRepository.findByShopAndDateAfterAndStatus(shop, todayStart, orderStatus);
        List<OrderResponseDto> orderDtoList = new ArrayList<>();
        for (Orders order : orderList) {
            orderDtoList.add(new OrderResponseDto(order));
        }
        return orderDtoList;
    }

    @Transactional
    public OrderResponseDto modifyStatus(Long orderId, OrderUpdateRequestDto orderUpdateRequestDto) {

        Orders order = orderRepository.findById(orderId)
                .orElseThrow(NoSuchElementException::new);
        OrderStatus enumStatus = OrderStatus.from(orderUpdateRequestDto.getStatus());
        order.modifyOrderStatus(enumStatus);
        return new OrderResponseDto(order);
    }

    public Integer calPeriodRevenue(String email, LocalDateTime from, LocalDateTime to) {

        Partner partner = partnerRepository.findByEmailWithShop(email)
                .orElseThrow(NoSuchElementException::new);
        Shop shop = partner.getShop();
        LocalDateTime start = startDateTime(from);
        LocalDateTime end = endDateTime(to);
        List<Integer> prices = orderRepository.findRevenueListByDays(shop, start, end, OrderStatus.COMPLETED);
        int dayTotalRevenue = 0;
        for (int price: prices) {
            dayTotalRevenue = dayTotalRevenue + price;
        }
        return dayTotalRevenue;
    }

    public Integer calTotalRevenue(String email, LocalDateTime now) {
        Partner partner = partnerRepository.findByEmailWithShop(email)
                .orElseThrow(NoSuchElementException::new);
        Shop shop = partner.getShop();
        return orderRepository.findTotalRevenue(shop, OrderStatus.COMPLETED);
    }





    private LocalDateTime startDateTime(LocalDateTime dateTime) {
        return LocalDateTime.of(dateTime.toLocalDate(), LocalTime.of(0,0,0));
    }

    private LocalDateTime endDateTime(LocalDateTime dateTime) {
        return LocalDateTime.of(dateTime.toLocalDate(), LocalTime.of(23,59,59));
    }

}
