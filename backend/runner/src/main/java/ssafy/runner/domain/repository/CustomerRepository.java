package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.runner.domain.entity.Customer;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    boolean existsByEmailAndPassword(String email, String password);
    Optional<Customer> findByEmail(String email);

    @Query(value = "select c.nickname from Customer c where c.email = :email")
    String findNicknameByEmail(@Param("email") String email);
}
