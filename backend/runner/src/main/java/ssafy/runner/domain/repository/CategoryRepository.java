package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.runner.domain.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
