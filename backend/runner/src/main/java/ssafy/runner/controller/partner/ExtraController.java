package ssafy.runner.controller.partner;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.runner.domain.dto.extra.ExtraCreateRequestDto;
import ssafy.runner.domain.dto.extra.ExtraResponseDto;
import ssafy.runner.domain.dto.extra.ExtraUpdateRequestDto;
import ssafy.runner.service.ExtraService;

@RestController
@Api(tags = {"Extra 관련 API"})
@RequiredArgsConstructor
@RequestMapping("/api/partner/menu")
public class ExtraController {

    private final ExtraService extraService;

    @PostMapping("/{menuId}/extra")
    @ApiOperation(value = "메뉴 extra 생성")
    public ResponseEntity createExtra(@PathVariable("menuId") Long menuId, @RequestBody ExtraCreateRequestDto params) {
        Long extraId = extraService.save(menuId, params);

        return new ResponseEntity("Extra 생성 성공", HttpStatus.OK);
    }

    @PatchMapping("/{menuId}/extra")
    @ApiOperation(value = "메뉴 extra 수정")  // extra 생성 DTO와 동일해서 재사용함
    public ResponseEntity updateExtra(@PathVariable("menuId") Long menuId, @RequestBody ExtraUpdateRequestDto params) {
        ExtraResponseDto extraResponseDto = extraService.updateExtra(menuId, params);

        return new ResponseEntity(extraResponseDto, HttpStatus.OK);
    }
}
