package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.customer.CustomerJoinResponseDto;
import ssafy.runner.domain.entity.Customer;
import ssafy.runner.domain.repository.CustomerRepository;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Transactional
    public CustomerJoinResponseDto join(String email, String password, String nickname) {
        validateDuplicate(email);
        Customer customer = customerRepository.save(new Customer(email, password, nickname));
        return CustomerJoinResponseDto.of(customer);
    }

    public boolean findCustomerExist(String email, String password) {
        System.out.println("CustomerRepository 실행");
        return customerRepository.existsByEmailAndPassword(email, password);
    }

    private void validateDuplicate(String email){
        customerRepository.findByEmail(email)
            .ifPresent(c -> {
                throw new IllegalStateException("이미 가입된 이메일 주소입니다.");
                });
    }
}
