package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.shop.CategoryResponseDto;
import ssafy.runner.domain.entity.Category;
import ssafy.runner.domain.repository.CategoryRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional
    public List<CategoryResponseDto> getCategoryList() {
        List<CategoryResponseDto> categoryList = new ArrayList<>();
        List<Category> results = categoryRepository.findAll();
        CategoryResponseDto categoryResponseDto = new CategoryResponseDto();

        for (Category result : results) {
            categoryList.add(categoryResponseDto.entityToDto(result));
        }
        return categoryList;
    }
}
