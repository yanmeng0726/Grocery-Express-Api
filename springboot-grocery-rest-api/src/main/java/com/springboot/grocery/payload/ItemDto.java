package com.springboot.grocery.payload;

import lombok.Data;

@Data
public class ItemDto {
    private Long id;

    private double unit_price;

    private double weight;

    private String name;
}
