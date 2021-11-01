package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.runner.domain.entity.Customer;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    boolean existsByEmailAndPassword(String email, String password);

    Optional<Customer> findByEmail(String email);
}
