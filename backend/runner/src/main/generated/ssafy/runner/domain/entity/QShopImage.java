package ssafy.runner.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QShopImage is a Querydsl query type for ShopImage
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QShopImage extends EntityPathBase<ShopImage> {

    private static final long serialVersionUID = 1167058272L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QShopImage shopImage = new QShopImage("shopImage");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> idx = createNumber("idx", Integer.class);

    public final StringPath imgUrl = createString("imgUrl");

    public final QShop shop;

    public QShopImage(String variable) {
        this(ShopImage.class, forVariable(variable), INITS);
    }

    public QShopImage(Path<? extends ShopImage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QShopImage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QShopImage(PathMetadata metadata, PathInits inits) {
        this(ShopImage.class, metadata, inits);
    }

    public QShopImage(Class<? extends ShopImage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.shop = inits.isInitialized("shop") ? new QShop(forProperty("shop"), inits.get("shop")) : null;
    }

}

