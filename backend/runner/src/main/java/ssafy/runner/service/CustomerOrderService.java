package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.customer.CustomerOrderResponseDto;
import ssafy.runner.domain.dto.customer.order.detail.OrderDetailResDto;
import ssafy.runner.domain.entity.*;
import ssafy.runner.domain.repository.CustomerRepository;
import ssafy.runner.domain.repository.OrderMenuRepository;
import ssafy.runner.domain.repository.OrderRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomerOrderService {

    private final OrderRepository orderRepository;
    private final OrderMenuRepository orderMenuRepository;
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

    // 주문 상세 내역 조회하기
    public OrderDetailResDto findOneOrder(String email, Long orderId) {
        // orderId로 오더메뉴 페치해서 가져오기
        List<OrderMenu> orderMenuList = orderMenuRepository.findOneFetched(orderId);


        System.out.println("===============조회시작====================");
        orderMenuList.forEach(orderMenu->{
            System.out.println("===============조회시작-inner====================");
            Orders order = orderMenu.getOrder();
            List<OrderMenuExtra> orderMenuExtras = orderMenu.getOrderMenuExtras();
            Menu menu = orderMenu.getMenu();
            MenuSize menuSize = orderMenu.getMenuSize();

            System.out.println("orderMenuList = " + orderMenuList);
            System.out.println("orderMenu = " + orderMenu);
            System.out.println("order = " + order);
            System.out.println("orderMenuExtras = " + orderMenuExtras);
            System.out.println("menu = " + menu);
            System.out.println("menuSize = " + menuSize);
            // 여기부터는 N+1이 발생할 것 같은 쿼리
            System.out.println("Size = " + menuSize.getSize().getId());
            System.out.println("Size = " + menuSize.getSize().getType());
            orderMenuExtras.forEach(ome->{
                System.out.println("orderMenuExtra = "+ome.getExtra().getId());
                System.out.println("orderMenuExtra = "+ome.getExtra().getName());
            });
            // N+1이 발생할 것 같은 쿼리 종료

            System.out.println("===============조회종료-inner====================");

        });
        System.out.println("===============조회종료====================");
        // 분해조립해서 알맞은 dto로 만들어주어야 함
        return OrderDetailResDto.of(orderMenuList);
    }
}
