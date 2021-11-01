package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.entity.Customer;
import ssafy.runner.domain.entity.CustomerShop;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.repository.CustomerRepository;
import ssafy.runner.domain.repository.CustomerShopRepository;
import ssafy.runner.domain.repository.ShopRepository;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomerShopService {

    private final CustomerShopRepository customerShopRepository;
    private final ShopRepository shopRepository;
    private final CustomerRepository customerRepository;

    public void likeShop(Long shopId, String email) {

        Shop shop = shopRepository.findById(shopId).orElseThrow(NoSuchElementException::new);
        Customer customer = customerRepository.findByEmailEquals(email).orElseThrow(NoSuchElementException::new);

        customerShopRepository.save(new CustomerShop(shop, customer));

    }
}
