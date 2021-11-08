package ssafy.runner.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOrderMenuExtra is a Querydsl query type for OrderMenuExtra
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QOrderMenuExtra extends EntityPathBase<OrderMenuExtra> {

    private static final long serialVersionUID = 485590472L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOrderMenuExtra orderMenuExtra = new QOrderMenuExtra("orderMenuExtra");

    public final QExtra extra;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QOrderMenu orderMenu;

    public QOrderMenuExtra(String variable) {
        this(OrderMenuExtra.class, forVariable(variable), INITS);
    }

    public QOrderMenuExtra(Path<? extends OrderMenuExtra> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOrderMenuExtra(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOrderMenuExtra(PathMetadata metadata, PathInits inits) {
        this(OrderMenuExtra.class, metadata, inits);
    }

    public QOrderMenuExtra(Class<? extends OrderMenuExtra> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.extra = inits.isInitialized("extra") ? new QExtra(forProperty("extra"), inits.get("extra")) : null;
        this.orderMenu = inits.isInitialized("orderMenu") ? new QOrderMenu(forProperty("orderMenu"), inits.get("orderMenu")) : null;
    }

}

