package ssafy.runner.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCustomerShop is a Querydsl query type for CustomerShop
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCustomerShop extends EntityPathBase<CustomerShop> {

    private static final long serialVersionUID = -1377546055L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCustomerShop customerShop = new QCustomerShop("customerShop");

    public final QCustomer customer;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QShop shop;

    public QCustomerShop(String variable) {
        this(CustomerShop.class, forVariable(variable), INITS);
    }

    public QCustomerShop(Path<? extends CustomerShop> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCustomerShop(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCustomerShop(PathMetadata metadata, PathInits inits) {
        this(CustomerShop.class, metadata, inits);
    }

    public QCustomerShop(Class<? extends CustomerShop> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.customer = inits.isInitialized("customer") ? new QCustomer(forProperty("customer")) : null;
        this.shop = inits.isInitialized("shop") ? new QShop(forProperty("shop"), inits.get("shop")) : null;
    }

}

