package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.partner.OrderResponseDto;
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
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final PartnerRepository partnerRepository;

    // 해당 샵의 전체 주문 내역 조회
    public List<OrderResponseDto> findByShop(String email) {

        Optional<Partner> partnerOptional = partnerRepository.findByEmailWithShop(email);
        if (partnerOptional.isPresent()) {
            // 파트너로 샵정보 가져오기
            Shop shop = partnerOptional.get().getShop();
            // 해당 샵의 주문 리스트 뽑기
            List<Orders> orderList = orderRepository.findByShop(shop);
            // 응답할 디티오 리스트에 담기
            List<OrderResponseDto> orderDtoList = new ArrayList<>();
            for (Orders order : orderList) {
                orderDtoList.add(new OrderResponseDto(order));
            }
            return orderDtoList;
        } else throw new NullPointerException("존재하지 않는 파트너 입니다.");
    }

    // 해당 샵의 특정시간 이후 주문 내역 조회
    public List<OrderResponseDto> findByShopAndDay(String email, LocalDateTime dateTime) {

        Optional<Partner> partnerOptional = partnerRepository.findByEmailWithShop(email);
        if (partnerOptional.isPresent()) {
            Shop shop = partnerOptional.get().getShop();
            LocalDateTime todayStart = startDateTime(dateTime);
            List<Orders> orderList = orderRepository.findByShopAndDateAfter(shop, todayStart);
            List<OrderResponseDto> orderDtoList = new ArrayList<>();
            for (Orders order : orderList) {
                orderDtoList.add(new OrderResponseDto(order));
            }
            return orderDtoList;
        } else throw new NullPointerException("존재하지 않는 파트너 입니다.");
    }

    // 해당 샵의 특정시간 이후 주문 내역 상태별 조회
    public List<OrderResponseDto> findByShopAndDayAndStatus(String email, LocalDateTime dateTime, String status) {

        Optional<Partner> partnerOptional = partnerRepository.findByEmailWithShop(email);
        if (partnerOptional.isPresent()) {
            Shop shop = partnerOptional.get().getShop();
            LocalDateTime todayStart = startDateTime(dateTime);
            OrderStatus orderStatus = OrderStatus.valueOf(status);
            List<Orders> orderList = orderRepository.findByShopAndDateAfterAndStatus(shop, todayStart, orderStatus);
            List<OrderResponseDto> orderDtoList = new ArrayList<>();
            for (Orders order : orderList) {
                orderDtoList.add(new OrderResponseDto(order));
            }
            return orderDtoList;
        } else throw new NullPointerException("존재하지 않는 파트너 입니다.");
    }


    public LocalDateTime startDateTime(LocalDateTime dateTime) {
        return LocalDateTime.of(dateTime.toLocalDate(), LocalTime.of(0,0,0));
    }

    public LocalDateTime endDateTime(LocalDateTime dateTime) {
        return LocalDateTime.of(dateTime.toLocalDate(), LocalTime.of(23,59,59));
    }


}
