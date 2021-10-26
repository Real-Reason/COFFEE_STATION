package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.entity.Customer;
import ssafy.runner.domain.repository.CustomerRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomerTokenService {

    private final CustomerRepository customerRepository;

    public Customer join(String email, String password) {
        Customer customer = new Customer(email, password, "닉네임");
        return customerRepository.save(customer);
    }

    public boolean findCustomerExist(String email, String password) {
        return customerRepository.existsByEmailAndPassword(email, password);
    }
}
