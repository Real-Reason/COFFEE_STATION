package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.customer.CustomerOrderResponseDto;
import ssafy.runner.domain.entity.Customer;
import ssafy.runner.domain.entity.Orders;
import ssafy.runner.domain.repository.CustomerRepository;
import ssafy.runner.domain.repository.OrderRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomerOrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;

    public List<CustomerOrderResponseDto> findCustomerOrders(String email) {
        Customer customer = customerRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
        List<Orders> orderList = orderRepository.findByCustomer(customer);
        List<CustomerOrderResponseDto> dtoList = new ArrayList<>();
        orderList.forEach(o->{
            dtoList.add(CustomerOrderResponseDto.of(o));
        });
        return dtoList;
    }
}
