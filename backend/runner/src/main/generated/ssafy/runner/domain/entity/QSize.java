package ssafy.runner.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QSize is a Querydsl query type for Size
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QSize extends EntityPathBase<Size> {

    private static final long serialVersionUID = 718017990L;

    public static final QSize size = new QSize("size1");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final EnumPath<ssafy.runner.domain.enums.SizeType> type = createEnum("type", ssafy.runner.domain.enums.SizeType.class);

    public QSize(String variable) {
        super(Size.class, forVariable(variable));
    }

    public QSize(Path<? extends Size> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSize(PathMetadata metadata) {
        super(Size.class, metadata);
    }

}

