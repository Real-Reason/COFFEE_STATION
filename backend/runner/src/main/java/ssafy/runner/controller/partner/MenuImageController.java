package ssafy.runner.controller.partner;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ssafy.runner.service.S3Uploader;

import java.io.IOException;
import java.util.List;

@RestController
@Api(tags = {"메뉴 이미지 관련 API"})
@RequiredArgsConstructor
@RequestMapping("/api/partner/menu")
public class MenuImageController {

    private final S3Uploader s3Uploader;

    @PostMapping("/image")
    @ApiOperation(value = "메뉴 이미지 생성")
    public String uploadMenuImage(@RequestParam("images") List<MultipartFile> multipartFile) throws IOException {

        List<String> urlList = s3Uploader.upload(multipartFile, "menu");
        return urlList.get(0);
    }
}
