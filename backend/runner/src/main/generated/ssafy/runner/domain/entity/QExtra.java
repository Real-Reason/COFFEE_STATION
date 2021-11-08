package ssafy.runner.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QExtra is a Querydsl query type for Extra
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QExtra extends EntityPathBase<Extra> {

    private static final long serialVersionUID = 771233515L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QExtra extra = new QExtra("extra");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QMenu menu;

    public final StringPath name = createString("name");

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public QExtra(String variable) {
        this(Extra.class, forVariable(variable), INITS);
    }

    public QExtra(Path<? extends Extra> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QExtra(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QExtra(PathMetadata metadata, PathInits inits) {
        this(Extra.class, metadata, inits);
    }

    public QExtra(Class<? extends Extra> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.menu = inits.isInitialized("menu") ? new QMenu(forProperty("menu"), inits.get("menu")) : null;
    }

}

