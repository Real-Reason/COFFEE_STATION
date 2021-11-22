package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.customer.Like.LikeMenuListResponseDto;
import ssafy.runner.domain.dto.customer.Like.LikeMenuResponseDto;
import ssafy.runner.domain.entity.Customer;
import ssafy.runner.domain.entity.CustomerMenu;
import ssafy.runner.domain.entity.Menu;
import ssafy.runner.domain.repository.CustomerMenuRepository;
import ssafy.runner.domain.repository.CustomerRepository;
import ssafy.runner.domain.repository.MenuRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomerMenuService {

    private final CustomerMenuRepository customerMenuRepository;
    private final MenuRepository menuRepository;
    private final CustomerRepository customerRepository;

    @Transactional
    public LikeMenuResponseDto likeMenu(Long menuId, String email) {

        Menu menu = menuRepository.findById(menuId).orElseThrow(NoSuchElementException::new);
        Customer customer = customerRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);

        CustomerMenu customerMenu = customerMenuRepository.save(new CustomerMenu(customer, menu));
        return LikeMenuResponseDto.of(customerMenu);
    }

    @Transactional
    public Long unLikeMenu(Long menuId, String email) {

        Customer customer = customerRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
        customerMenuRepository.unLikeMenu(customer.getId(), menuId);
        return menuId;
    }

    @Transactional
    public LikeMenuListResponseDto getLikeMenuList(String email) {

        Customer customer = customerRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
        Long customerId = customer.getId();
        List<CustomerMenu> customerLikeMenuList = customerMenuRepository.findAllByCustomerId(customerId);

        return LikeMenuListResponseDto.of(customerLikeMenuList);
    }
}
