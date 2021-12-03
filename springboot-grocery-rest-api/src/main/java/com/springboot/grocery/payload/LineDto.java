package com.springboot.grocery.payload;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class LineDto {
    private Long id;
    @NotNull
    private int quantity;
    private Long order_id;
    private Long item_id;
    private String name;
    private double unit_price;
    private double weight;

}
