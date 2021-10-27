package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.customer.CustomerJoinResponseDto;
import ssafy.runner.domain.dto.partner.PartnerJoinResponseDto;
import ssafy.runner.domain.entity.Customer;
import ssafy.runner.domain.entity.Partner;
import ssafy.runner.domain.repository.CustomerRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;


    @Transactional
    public CustomerJoinResponseDto join(String email, String password, String nickname) {
        Customer customer = customerRepository.save(new Customer(email, password, nickname));
        return CustomerJoinResponseDto.of(customer);
    }

    public boolean findCustomerExist(String email, String password) {
        System.out.println("CustomerRepository 실행");
        return customerRepository.existsByEmailAndPassword(email, password);
    }
}
