package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.*;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.WKTReader;
import org.locationtech.jts.operation.distance.DistanceOp;
import org.locationtech.jts.util.GeometricShapeFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ssafy.runner.domain.dto.customer.ShopAndMenuResponseDto;
import ssafy.runner.domain.dto.shop.ShopBriefResponseDto;
import ssafy.runner.domain.dto.shop.ShopReqDto;
import ssafy.runner.domain.dto.shop.ShopResDto;
import ssafy.runner.domain.entity.Partner;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.entity.ShopImage;
import ssafy.runner.domain.enums.ShopStatus;
import ssafy.runner.domain.repository.PartnerRepository;
import ssafy.runner.domain.repository.ShopImageRepository;
import ssafy.runner.domain.repository.ShopRepository;

import java.io.IOException;
import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ShopService {

    private final ShopRepository shopRepository;
    private final PartnerRepository partnerRepository;

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
                ShopBriefResponseDto shopBriefResponseDto = new ShopBriefResponseDto(shop, howFar);
                shopList.add(shopBriefResponseDto);
            }
        }
        return shopList;
    }

    @Transactional
    public Long save(ShopReqDto params, Long partnerId) throws IOException, ParseException {

        Optional<Partner> optional = partnerRepository.findById(partnerId);
        if (optional.isEmpty()) throw new RuntimeException("회원이 없습니다");
        Partner partner = optional.get();
        Point point = getPoint(params.getX(), params.getY());
        Shop shop = new Shop(partner, params.getName(), params.getBusiness_no(), params.getPhone_number(), params.getAddress(), params.getDetail_address(), params.getZip_code(), point, params.getStatus(), params.getOpen_at(), params.getClose_at(), params.getIntro(), params.getInstagram());
        shopRepository.save(shop);
        return shop.getId();
    }

    public ShopResDto getShopDetail(Long shopId) {

        Optional<Shop> optional = shopRepository.findById(shopId);
        if (optional.isEmpty()) throw new RuntimeException("가게가 없습니다.");
        Shop shop = optional.get();
        return ShopResDto.entityToDto(shop);
    }

    @Transactional
    public void changeShopStatus(String status, Long shopId) {

        Shop shop = shopRepository.getById(shopId);
        ShopStatus enumStatus = ShopStatus.valueOf(status);
        shop.changeShopStatus(enumStatus);
    }

    @Transactional
    public ShopAndMenuResponseDto getShopAndMenu(Long shopId) {

        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(NoSuchElementException::new);
        return ShopAndMenuResponseDto.entityToDto(shop);
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
}
