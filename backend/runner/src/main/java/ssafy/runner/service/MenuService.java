package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.partner.MenuListResponseDto;
import ssafy.runner.domain.dto.partner.MenuResponseDto;
import ssafy.runner.domain.dto.partner.ResultResponseDto;
import ssafy.runner.domain.entity.Category;
import ssafy.runner.domain.entity.Menu;
import ssafy.runner.domain.entity.Partner;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.enums.MenuStatus;
import ssafy.runner.domain.repository.CategoryRepository;
import ssafy.runner.domain.repository.MenuRepository;
import ssafy.runner.domain.repository.PartnerRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MenuService {

    private final PartnerRepository partnerRepository;
    private final CategoryRepository categoryRepository;
    private final MenuRepository menuRepository;

    private Shop findPartnerShop(String email) {
        Partner partner = partnerRepository.findByEmailWithShop(email).orElseThrow(NoSuchElementException::new);
        return  partner.getShop();
    }

    @Transactional
    public MenuResponseDto createMenu(String email, Long categoryId, int price, String name, String imgUrl, boolean signature) {
        // 우선 partner를 샵과 같이 가져오기
        Shop shop = findPartnerShop(email);
        // 카테고리 가져오기
        Category category = categoryRepository.findById(categoryId).orElseThrow(NoSuchElementException::new);
        // partner와 샵을 같이 가져왔으면 샵id를 넣어서 메뉴 만들어서 저장하기
        Menu menu = Menu.builder()
            .shop(shop)
            .category(category)
            .name(name)
            .imgUrl(imgUrl)
            .isSignature(signature)
            .price(price)
            .menuStatus(MenuStatus.NOT_SALE)
            .build();
        Menu savedMenu = menuRepository.save(menu);
        return MenuResponseDto.of(savedMenu);
    }

    public MenuListResponseDto findShopMenuList(String email) {
        Shop shop = findPartnerShop(email);
        List<Menu> menuList = menuRepository.findAllByShopWithCategory(shop.getId());
        return MenuListResponseDto.of(menuList);
    }

    public MenuResponseDto findShopMenu(String email, Long menuId) {
        Shop shop = findPartnerShop(email);
        Menu menu = menuRepository.findByShopAndId(shop, menuId).orElseThrow(NoSuchElementException::new);
        return MenuResponseDto.of(menu);
    }

    @Transactional
    public MenuResponseDto updateMenu(String email, Long menuId, Long categoryId, String name, String imgUrl, int price, boolean signature) {
        Shop shop = findPartnerShop(email);
        Menu menu = menuRepository.findByShopAndId(shop, menuId).orElseThrow(NoSuchElementException::new);
        Category category = categoryRepository.findById(categoryId).orElseThrow(NoSuchElementException::new);
        menu.updateMenu(category, name, imgUrl, price, signature);

        return MenuResponseDto.of(menu);
    }

    @Transactional
    public ResultResponseDto deleteMenu(String email, Long menuId) {
        Shop shop = findPartnerShop(email);
        Menu menu = menuRepository.findByShopAndId(shop, menuId).orElseThrow(NoSuchElementException::new);
        menuRepository.delete(menu);
        return new ResultResponseDto(true);
    }

    @Transactional
    public MenuResponseDto updateMenuStatus(String email, Long menuId, String menuStatus) {
        Shop shop = findPartnerShop(email);
        Menu menu = menuRepository.findByShopAndId(shop, menuId).orElseThrow(NoSuchElementException::new);
        menu.updateMenuStatus(MenuStatus.valueOf(menuStatus));
        return MenuResponseDto.of(menu);
    }



}
