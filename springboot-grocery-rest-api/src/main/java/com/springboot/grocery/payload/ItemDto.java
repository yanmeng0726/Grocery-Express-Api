package com.springboot.grocery.payload;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import javax.validation.constraints.NotNull;

@Data
public class ItemDto {
    private Long id;

    @NotNull
    private double unit_price;

    @NotNull
    private double weight;

    @NotEmpty
    @Size(max = 10, message = " item name should have at most 10 characters ")
    private String name;
}
