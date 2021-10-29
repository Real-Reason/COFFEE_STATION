package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.menu.MenuSizeResponseDto;
import ssafy.runner.domain.entity.*;
import ssafy.runner.domain.repository.MenuRepository;
import ssafy.runner.domain.repository.MenuSizeRepository;
import ssafy.runner.domain.repository.PartnerRepository;
import ssafy.runner.domain.repository.SizeRepository;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MenuSizeService {

    private final PartnerRepository partnerRepository;
    private final MenuRepository menuRepository;
    private final SizeRepository sizeRepository;
    private final MenuSizeRepository menuSizeRepository;

    @Transactional
    public MenuSizeResponseDto createMenuSize(String email, Long menuId, Long sizeId, int price) {
        if (!partnerRepository.existsByEmail(email)) throw new RuntimeException("파트너가 없습니다.");

        Optional<Menu> optionalMenu = menuRepository.findById(menuId);
        Optional<Size> optionalSize = sizeRepository.findById(sizeId);
        if (optionalMenu.isEmpty()) throw new RuntimeException("메뉴가 없습니다.");
        if (optionalSize.isEmpty()) throw new RuntimeException("해당사이즈가 없습니다.");
        MenuSize menuSize = menuSizeRepository.save(new MenuSize(optionalMenu.get(), optionalSize.get(), price));
        return MenuSizeResponseDto.of(menuSize);
    }

    @Transactional
    public MenuSizeResponseDto updateMenuSize(String email, Long menuSizeId, Long menuId, Long sizeId, int price) {
        if (!partnerRepository.existsByEmail(email)) throw new RuntimeException("파트너가 없습니다.");

        Optional<Menu> optionalMenu = menuRepository.findById(menuId);
        Optional<Size> optionalSize = sizeRepository.findById(sizeId);
        Optional<MenuSize> optionalMenuSize = menuSizeRepository.findById(menuSizeId);
        if (optionalMenu.isEmpty()) throw new RuntimeException("메뉴가 없습니다.");
        if (optionalSize.isEmpty()) throw new RuntimeException("해당사이즈가 없습니다.");
        if (optionalMenuSize.isEmpty()) throw new RuntimeException("해당 메뉴사이즈가 없습니다.");
        MenuSize menuSize = optionalMenuSize.get();
        menuSize.changeMenuSize(optionalMenu.get(), optionalSize.get(), price);
        return MenuSizeResponseDto.of(menuSize);
    }
}
