package com.springboot.grocery.payload;


import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private Long user_id;
    private Long store_id;
    private Long drone_id;
    private Long employee_id;
    private double total_cost;
    private double total_weight;
    @NotNull
    private int order_status;
    private List<LineDto> lines;
}
