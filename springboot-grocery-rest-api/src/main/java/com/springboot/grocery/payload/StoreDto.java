package com.springboot.grocery.payload;

import lombok.Data;

import java.util.Set;

@Data
public class StoreDto {
    private long id;
    private String name;
    private double revenue;
    private Set<DroneDto> drones;
}
