package ssafy.runner.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QShop is a Querydsl query type for Shop
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QShop extends EntityPathBase<Shop> {

    private static final long serialVersionUID = 718016699L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QShop shop = new QShop("shop");

    public final StringPath address = createString("address");

    public final StringPath business_no = createString("business_no");

    public final StringPath close_at = createString("close_at");

    public final StringPath detail_address = createString("detail_address");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath instagram = createString("instagram");

    public final StringPath intro = createString("intro");

    public final ComparablePath<org.locationtech.jts.geom.Point> location = createComparable("location", org.locationtech.jts.geom.Point.class);

    public final ListPath<Menu, QMenu> menuList = this.<Menu, QMenu>createList("menuList", Menu.class, QMenu.class, PathInits.DIRECT2);

    public final StringPath name = createString("name");

    public final StringPath open_at = createString("open_at");

    public final QPartner partner;

    public final StringPath phone_number = createString("phone_number");

    public final EnumPath<ssafy.runner.domain.enums.ShopStatus> status = createEnum("status", ssafy.runner.domain.enums.ShopStatus.class);

    public final StringPath zip_code = createString("zip_code");

    public QShop(String variable) {
        this(Shop.class, forVariable(variable), INITS);
    }

    public QShop(Path<? extends Shop> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QShop(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QShop(PathMetadata metadata, PathInits inits) {
        this(Shop.class, metadata, inits);
    }

    public QShop(Class<? extends Shop> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.partner = inits.isInitialized("partner") ? new QPartner(forProperty("partner"), inits.get("partner")) : null;
    }

}

