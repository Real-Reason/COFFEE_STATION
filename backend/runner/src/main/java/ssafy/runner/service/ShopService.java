package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.*;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.WKTReader;
import org.locationtech.jts.operation.distance.DistanceOp;
import org.locationtech.jts.util.GeometricShapeFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.customer.ShopAndMenuResponseDto;
import ssafy.runner.domain.dto.shop.SearchShopResponseDto;
import ssafy.runner.domain.dto.shop.ShopBriefResponseDto;
import ssafy.runner.domain.dto.shop.ShopReqDto;
import ssafy.runner.domain.dto.shop.ShopResDto;
import ssafy.runner.domain.entity.*;
import ssafy.runner.domain.enums.ShopStatus;
import ssafy.runner.domain.repository.*;

import java.io.IOException;
import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ShopService {

    private final ShopRepository shopRepository;
    private final ShopImageRepository shopImageRepository;
    private final PartnerRepository partnerRepository;
    private final CustomerRepository customerRepository;
    private final CustomerShopRepository customerShopRepository;

    // 근처 카페 리스트 가져오기
    public List<ShopBriefResponseDto> findNearShopList(double x, double y, double distance) throws ParseException {
        // y: 위도, x: 경도
        Geometry circle = createCircle(y, x, distance);
        System.out.println("==================circle============ " + circle);
        Point point = getPoint(x, y);
        System.out.println("===================point=================== " + point);
        List<Shop> shops = shopRepository.findNears(circle);
        System.out.println("==================shops================ " + shops);
        List<ShopBriefResponseDto> shopList = new ArrayList<>();
        if (shops.size() == 0) {
            throw new NullPointerException("주변에 카페가 없습니다.!!!!!!!!!!!");
        } else {
            for (Shop shop: shops) {
                double howFar = new DistanceOp(point, shop.getLocation()).distance();
                String imgUrl = shopImageRepository.findByShopIdAndIndex(shop.getId(), 1).orElse("https://coffee-station.s3.ap-northeast-2.amazonaws.com/thum_detail.jpg");
                ShopBriefResponseDto shopBriefResponseDto = new ShopBriefResponseDto(shop, howFar, imgUrl);
                shopList.add(shopBriefResponseDto);
            }
        }
        return shopList;
    }

    @Transactional
    public Long save(ShopReqDto params, String email) throws IOException, ParseException {
        Partner partner = partnerRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
        Point point = getPoint(params.getX(), params.getY());
        Shop shop = params.toEntity(point, partner);
        shopRepository.save(shop);
        return shop.getId();
    }

    public ShopResDto getShopDetail(String email) {

        Partner partner = partnerRepository.findByEmailWithShop(email).orElseThrow(NoSuchElementException::new);
        Long shopId = partner.getShop().getId();
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(NoSuchElementException::new);
        List<String> imgUrlList = shopImageRepository.findAllByShopId(shopId);

        return ShopResDto.entityToDto(shop, imgUrlList);
    }

    @Transactional
    public void changeShopStatus(String status, String email) {

        Partner partner = partnerRepository.findByEmailWithShop(email).orElseThrow(NoSuchElementException::new);
        Long shopId = partner.getShop().getId();
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(NoSuchElementException::new);
        ShopStatus enumStatus = ShopStatus.valueOf(status);
        shop.changeShopStatus(enumStatus);
    }

    @Transactional
    public ShopAndMenuResponseDto getShopAndMenu(Long shopId, String email) {

        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(NoSuchElementException::new);
        List<String> imgUrlList = shopImageRepository.findAllByShopId(shop.getId());

        Boolean customerLikeShop = true;
        Customer customer = customerRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
        Optional<CustomerShop> customerShop  = customerShopRepository.findLikeOrNot(customer.getId(), shopId);
        if (customerShop.isEmpty()) {
            customerLikeShop = false;
        }

        return ShopAndMenuResponseDto.entityToDtoCanSale(shop, imgUrlList, customerLikeShop);
    }

    private Point getPoint(double x, double y) throws ParseException {
        String pointWKT = String.format("POINT(%s %s)", y, x);
        return (Point) new WKTReader().read(pointWKT);
    }

    // 반경 지도데이터 만들기
    private Geometry createCircle(double x, double y, double radius) {
        GeometricShapeFactory shapeFactory = new GeometricShapeFactory();
        shapeFactory.setNumPoints(32);
        shapeFactory.setCentre(new Coordinate(x, y));
        shapeFactory.setSize(radius * 2);
        return shapeFactory.createCircle();
    }

    @Transactional
    public List<SearchShopResponseDto> searchShop(String searchWord) {

        List<SearchShopResponseDto> result = new ArrayList<>();
        List<Shop> shops = shopRepository.searchShop(searchWord);

        for (Shop shop : shops) {
            String imgUrl = shopImageRepository.findByShopIdAndIndex(shop.getId(), 1).orElse("https://coffee-station.s3.ap-northeast-2.amazonaws.com/thum_detail.jpg");

            SearchShopResponseDto searchResponse = SearchShopResponseDto.entityToDto(shop, imgUrl.toString());
            result.add(searchResponse);
        }

        return result;
    }
}
