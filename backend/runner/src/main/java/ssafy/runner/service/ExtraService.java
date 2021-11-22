package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.extra.ExtraCreateRequestDto;
import ssafy.runner.domain.dto.extra.ExtraResponseDto;
import ssafy.runner.domain.dto.extra.ExtraUpdateRequestDto;
import ssafy.runner.domain.entity.Extra;
import ssafy.runner.domain.entity.Menu;
import ssafy.runner.domain.repository.ExtraRepository;
import ssafy.runner.domain.repository.MenuRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ExtraService {

    private final ExtraRepository extraRepository;
    private final MenuRepository menuRepository;

    @Transactional
    public Long save(Long menuId, ExtraCreateRequestDto params) {
        Menu menu = menuRepository.getById(menuId);
        Extra extra = new Extra(menu, params.getName(), params.getPrice());
        extraRepository.save(extra);

        return extra.getId();
    }

    @Transactional
    public ExtraResponseDto updateExtra(Long menuId, ExtraUpdateRequestDto params) {
        Menu menu = menuRepository.getById(menuId);
        Extra extra = extraRepository.getById(params.getId());
        extra.updateExtra(menu, params.getName(), params.getPrice());

        return ExtraResponseDto.entityToDto(extra);
    }
}
