package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.entity.Customer;
import ssafy.runner.domain.entity.CustomerMenu;
import ssafy.runner.domain.entity.Menu;
import ssafy.runner.domain.repository.CustomerMenuRepository;
import ssafy.runner.domain.repository.CustomerRepository;
import ssafy.runner.domain.repository.MenuRepository;

import java.util.NoSuchElementException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomerMenuService {

    private final CustomerMenuRepository customerMenuRepository;
    private final MenuRepository menuRepository;
    private final CustomerRepository customerRepository;


    public void likeMenu(Long menuId, String email) {

        Menu menu = menuRepository.findById(menuId).orElseThrow(NoSuchElementException::new);
        Customer customer = customerRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);

        customerMenuRepository.save(new CustomerMenu(customer, menu));
    }
}
