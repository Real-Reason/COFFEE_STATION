package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.partner.OrderResponseDto;
import ssafy.runner.domain.repository.OrderRepository;
import ssafy.runner.domain.repository.ShopRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ShopRepository shopRepository;

//    public List<OrderResponseDto> findByShop(String email, String password) {
//        Optional<Shop> shop = shopRepository.findByEmail
//        orderRepository.findAllById(shopId)
//    }
}
