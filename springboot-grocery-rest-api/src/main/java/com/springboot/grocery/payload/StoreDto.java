package com.springboot.grocery.payload;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.util.Set;

@Data
public class StoreDto {
    private long id;
    @NotEmpty
    private String name;
    private double revenue;
    private Set<ItemDto> items;
}
