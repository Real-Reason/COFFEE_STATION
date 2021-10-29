package ssafy.runner.domain.dto.shop;

import lombok.*;
import ssafy.runner.domain.entity.Category;

@Getter @ToString
@NoArgsConstructor @AllArgsConstructor
@Builder
public class CategoryResponseDto {
    private Long categoryId;
    private String name;

    public CategoryResponseDto entityToDto(Category category) {
        return CategoryResponseDto.builder()
                .categoryId(category.getId())
                .name(category.getName())
                .build();
    }

}
