package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.partner.MenuCreateResponseDto;
import ssafy.runner.domain.dto.partner.MenuListResponseDto;
import ssafy.runner.domain.dto.partner.MenuResponseDto;
import ssafy.runner.domain.entity.Category;
import ssafy.runner.domain.entity.Menu;
import ssafy.runner.domain.entity.Partner;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.repository.CategoryRepository;
import ssafy.runner.domain.repository.MenuRepository;
import ssafy.runner.domain.repository.PartnerRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MenuService {

    private final PartnerRepository partnerRepository;
    private final CategoryRepository categoryRepository;
    private final MenuRepository menuRepository;

    @Transactional
    public MenuCreateResponseDto createMenu(String email, Long categoryId, int price, String name, String imgUrl, boolean signature) {
        // 우선 partner를 샵과 같이 가져오기
        Optional<Partner> optionalPartner = partnerRepository.findByEmailWithShop(email);
        if (optionalPartner.isEmpty()) throw new RuntimeException("파트너가 없습니다.");
        Partner partner = optionalPartner.get();
        Shop shop = partner.getShop();
        // 카테고리 가져오기
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isEmpty()) throw new RuntimeException("카테고리가 없습니다");
        Category category = optionalCategory.get();
        // partner와 샵을 같이 가져왔으면 샵id를 넣어서 메뉴 만들어서 저장하기
        Menu menu = Menu.builder()
            .shop(shop)
            .category(category)
            .name(name)
            .imgUrl(imgUrl)
            .isSignature(signature)
            .price(price)
            .build();
        Menu savedMenu = menuRepository.save(menu);

        return new MenuCreateResponseDto(shop.getId(), category.getId(), savedMenu.getId(), menu.getName(), menu.getImgUrl(), menu.getPrice(), menu.isSignature());
    }

    public MenuListResponseDto findShopMenuList(String email) {
        Optional<Partner> optionalPartner = partnerRepository.findByEmailWithShop(email);
        if (optionalPartner.isEmpty()) throw new RuntimeException("파트너가 없습니다.");
        Partner partner = optionalPartner.get();
        Shop shop = partner.getShop();
        List<Menu> menuList = menuRepository.findAllByShopWithCategory(shop.getId());
        return MenuListResponseDto.of(menuList);
    }

    public MenuResponseDto findShopMenu(String email, Long menuId) {
        Optional<Partner> optionalPartner = partnerRepository.findByEmailWithShop(email);
        if (optionalPartner.isEmpty()) throw new RuntimeException("파트너가 없습니다.");
        Partner partner = optionalPartner.get();
        Shop shop = partner.getShop();
        Optional<Menu> optionalMenu = menuRepository.findByShopAndId(shop, menuId);
        if (optionalMenu.isEmpty()) throw new RuntimeException("가게에 해당 메뉴가 없습니다.");
        return MenuResponseDto.of(optionalMenu.get());
    }
}
