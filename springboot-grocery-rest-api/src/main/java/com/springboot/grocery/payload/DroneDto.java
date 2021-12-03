package com.springboot.grocery.payload;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class DroneDto {
    private Long id;

    @NotNull
    private double weight_limit;

    @NotNull
    private int trips_left;

    @NotNull
    private int status;

}
