package ssafy.runner.domain.dto.customer;

import lombok.Data;

@Data
public class AmountDto {

    private Integer total, tax_free, vat, point, discount;
}
