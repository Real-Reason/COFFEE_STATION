package ssafy.runner.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMenuSize is a Querydsl query type for MenuSize
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QMenuSize extends EntityPathBase<MenuSize> {

    private static final long serialVersionUID = -1051824827L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMenuSize menuSize = new QMenuSize("menuSize");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QMenu menu;

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final QSize size;

    public QMenuSize(String variable) {
        this(MenuSize.class, forVariable(variable), INITS);
    }

    public QMenuSize(Path<? extends MenuSize> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMenuSize(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMenuSize(PathMetadata metadata, PathInits inits) {
        this(MenuSize.class, metadata, inits);
    }

    public QMenuSize(Class<? extends MenuSize> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.menu = inits.isInitialized("menu") ? new QMenu(forProperty("menu"), inits.get("menu")) : null;
        this.size = inits.isInitialized("size") ? new QSize(forProperty("size")) : null;
    }

}

