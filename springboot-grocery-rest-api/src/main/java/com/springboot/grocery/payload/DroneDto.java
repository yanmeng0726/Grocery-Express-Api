package com.springboot.grocery.payload;

import lombok.Data;

@Data
public class DroneDto {
    private Long id;

    private double weight_limit;

    private int trips_left;

    private int status;

}
