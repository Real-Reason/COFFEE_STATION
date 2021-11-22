package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.customer.Like.LikeShopListResponseDto;
import ssafy.runner.domain.dto.customer.Like.LikeShopResponseDto;
import ssafy.runner.domain.entity.Customer;
import ssafy.runner.domain.entity.CustomerShop;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.repository.CustomerRepository;
import ssafy.runner.domain.repository.CustomerShopRepository;
import ssafy.runner.domain.repository.ShopImageRepository;
import ssafy.runner.domain.repository.ShopRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerShopService {

    private final CustomerShopRepository customerShopRepository;
    private final ShopRepository shopRepository;
    private final CustomerRepository customerRepository;

    @Transactional
    public LikeShopResponseDto likeShop(Long shopId, String email) {

        Shop shop = shopRepository.findById(shopId).orElseThrow(NoSuchElementException::new);
        Customer customer = customerRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
        CustomerShop customerShop = new CustomerShop(shop, customer);

        customerShopRepository.save(customerShop);
        return LikeShopResponseDto.of(customerShop);
    }

    @Transactional
    public Long unLikeShop(Long shopId, String email) {

        Customer customer = customerRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
        customerShopRepository.unLikeShop(customer.getId(), shopId);
        return shopId;
    }

    public LikeShopListResponseDto getLikeShopList(String email) {

        Customer customer = customerRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
        Long customerId = customer.getId();
        List<CustomerShop> customerLikeShopList = customerShopRepository.findAllByCustomerId(customerId);
        return LikeShopListResponseDto.of(customerLikeShopList);
    }

}
