package com.springboot.grocery.payload;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.util.List;
import java.util.Set;

@Data
public class StoreDto {
    private long id;
    @NotEmpty
    private String name;
    private double revenue;
    private Set<ItemDto> items;
    private List<EmployeeDto> employees;
    private List<DroneDto> drones;
}
