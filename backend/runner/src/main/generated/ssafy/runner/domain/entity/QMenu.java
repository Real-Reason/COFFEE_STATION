package ssafy.runner.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMenu is a Querydsl query type for Menu
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QMenu extends EntityPathBase<Menu> {

    private static final long serialVersionUID = 717835044L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMenu menu = new QMenu("menu");

    public final QCategory category;

    public final ListPath<Extra, QExtra> extraList = this.<Extra, QExtra>createList("extraList", Extra.class, QExtra.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imgUrl = createString("imgUrl");

    public final BooleanPath isSignature = createBoolean("isSignature");

    public final ListPath<MenuSize, QMenuSize> menuSizeList = this.<MenuSize, QMenuSize>createList("menuSizeList", MenuSize.class, QMenuSize.class, PathInits.DIRECT2);

    public final EnumPath<ssafy.runner.domain.enums.MenuStatus> menuStatus = createEnum("menuStatus", ssafy.runner.domain.enums.MenuStatus.class);

    public final StringPath name = createString("name");

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final QShop shop;

    public QMenu(String variable) {
        this(Menu.class, forVariable(variable), INITS);
    }

    public QMenu(Path<? extends Menu> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMenu(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMenu(PathMetadata metadata, PathInits inits) {
        this(Menu.class, metadata, inits);
    }

    public QMenu(Class<? extends Menu> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.category = inits.isInitialized("category") ? new QCategory(forProperty("category")) : null;
        this.shop = inits.isInitialized("shop") ? new QShop(forProperty("shop"), inits.get("shop")) : null;
    }

}

