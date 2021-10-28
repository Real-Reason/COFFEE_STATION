package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ssafy.runner.domain.entity.Menu;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;

@Repository
public class ShopRepositoryImpl implements ShopRepositoryCustom{

    @Override
    public List<Menu> findAllMenu() {
        return null;
    }
}
