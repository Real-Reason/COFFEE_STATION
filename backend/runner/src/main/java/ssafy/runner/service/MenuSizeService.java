package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.partner.MenuSizeCreateRequestDto;
import ssafy.runner.domain.dto.partner.MenuSizeListCreateResponseDto;
import ssafy.runner.domain.entity.*;
import ssafy.runner.domain.repository.MenuRepository;
import ssafy.runner.domain.repository.MenuSizeRepository;
import ssafy.runner.domain.repository.PartnerRepository;
import ssafy.runner.domain.repository.SizeRepository;

import java.util.ArrayList;
import java.util.List;
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
    public MenuSizeListCreateResponseDto createMenuSizeList(String email, Long menuId, List<MenuSizeCreateRequestDto> menuSizeCreateRequestDtoList) {
        Optional<Partner> optionalPartner = partnerRepository.findByEmailWithShop(email);
        if (optionalPartner.isEmpty()) throw new RuntimeException("파트너가 없습니다.");
        Partner partner = optionalPartner.get();
        Shop shop = partner.getShop();

        Optional<Menu> optionalMenu = menuRepository.findById(menuId);
        if (optionalMenu.isEmpty()) throw new RuntimeException("메뉴가 없습니다.");
        Menu menu = optionalMenu.get();
        List<MenuSize> menuSizeList = new ArrayList<>();
        // 전체를 객체로 만들어주어야 한다
        menuSizeCreateRequestDtoList.forEach(ms->{
            Optional<Size> optionalSize = sizeRepository.findById(ms.getSizeId());
            if (optionalSize.isEmpty()) throw new RuntimeException(""+ms.getSizeId()+" 사이즈가 없습니다");
            menuSizeList.add(new MenuSize(menu,optionalSize.get(), ms.getPrice()));
        });
        List<MenuSize> savedMenuSizeList = menuSizeRepository.saveAll(menuSizeList);
        return MenuSizeListCreateResponseDto.of(savedMenuSizeList);
    }
}
