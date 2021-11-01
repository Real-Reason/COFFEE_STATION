package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.entity.Menu;
import ssafy.runner.domain.enums.OrderStatus;
import ssafy.runner.domain.repository.MenuRepository;
import ssafy.runner.domain.repository.OrderMenuRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderMenuService {

    private final OrderMenuRepository orderMenuRepository;
    private final MenuRepository menuRepository;

    // 메뉴별 매출 조회
    public int findRevByMenu(String email, Long menuId) {

        Menu menu = menuRepository.findEmailById(menuId)
                .orElseThrow(NoSuchElementException::new);
        String partnerEmail = menu.getShop().getPartner().getEmail();
        if (partnerEmail.equals(email)) {
            Integer totalPrices = orderMenuRepository.findRevenueByMenu(menu, OrderStatus.COMPLETED);
            return totalPrices == null ? 0 : totalPrices;
        } else throw new IllegalStateException("해당 메뉴는 위 가게의 메뉴가 아닙니다.");
    }
}