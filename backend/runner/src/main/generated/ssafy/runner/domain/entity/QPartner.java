package ssafy.runner.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPartner is a Querydsl query type for Partner
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPartner extends EntityPathBase<Partner> {

    private static final long serialVersionUID = -1361570589L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPartner partner = new QPartner("partner");

    public final StringPath email = createString("email");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath password = createString("password");

    public final QShop shop;

    public QPartner(String variable) {
        this(Partner.class, forVariable(variable), INITS);
    }

    public QPartner(Path<? extends Partner> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPartner(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPartner(PathMetadata metadata, PathInits inits) {
        this(Partner.class, metadata, inits);
    }

    public QPartner(Class<? extends Partner> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.shop = inits.isInitialized("shop") ? new QShop(forProperty("shop"), inits.get("shop")) : null;
    }

}

