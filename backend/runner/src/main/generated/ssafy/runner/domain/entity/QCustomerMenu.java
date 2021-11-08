package ssafy.runner.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCustomerMenu is a Querydsl query type for CustomerMenu
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCustomerMenu extends EntityPathBase<CustomerMenu> {

    private static final long serialVersionUID = -1377727710L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCustomerMenu customerMenu = new QCustomerMenu("customerMenu");

    public final QCustomer customer;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QMenu menu;

    public QCustomerMenu(String variable) {
        this(CustomerMenu.class, forVariable(variable), INITS);
    }

    public QCustomerMenu(Path<? extends CustomerMenu> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCustomerMenu(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCustomerMenu(PathMetadata metadata, PathInits inits) {
        this(CustomerMenu.class, metadata, inits);
    }

    public QCustomerMenu(Class<? extends CustomerMenu> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.customer = inits.isInitialized("customer") ? new QCustomer(forProperty("customer")) : null;
        this.menu = inits.isInitialized("menu") ? new QMenu(forProperty("menu"), inits.get("menu")) : null;
    }

}

