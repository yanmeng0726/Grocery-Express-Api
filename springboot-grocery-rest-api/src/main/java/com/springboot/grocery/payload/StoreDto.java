package com.springboot.grocery.payload;

import lombok.Data;

@Data
public class StoreDto {
    private long id;
    private String name;
    private double revenue;
}
