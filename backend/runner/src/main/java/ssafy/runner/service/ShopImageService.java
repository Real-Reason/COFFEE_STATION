package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ssafy.runner.domain.dto.shop.ShopImageResponseDto;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.entity.ShopImage;
import ssafy.runner.domain.repository.ShopImageRepository;
import ssafy.runner.domain.repository.ShopRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ShopImageService {

    private final ShopImageRepository shopImageRepository;
    private final ShopRepository shopRepository;
    private final S3Uploader s3Uploader;

    @Transactional
    public List<ShopImageResponseDto> uploadShopImages(Long shopId, List<MultipartFile> multipartFile) throws IOException {

        List<ShopImageResponseDto> result = new ArrayList<>();

        Shop shop = shopRepository.getById(shopId);
        // s3 가게 이미지 저장
        String dirName = "shop" + "/" + shopId;
        List<String> urlList = s3Uploader.upload(multipartFile, dirName);

        // shopImage Repository에 imageUrl 저장
        for (String url : urlList) {
            System.out.println("url = " + url);
            String[] splitArray = url.split("/");
            int idx = Integer.parseInt(splitArray[splitArray.length - 1]);

            ShopImage shopImage = new ShopImage(shop, url, idx);
            shopImageRepository.save(shopImage);

            ShopImageResponseDto responseDto = ShopImageResponseDto.entityToDto(shopImage);
            result.add(responseDto);
        }

        return result;
    }
}
