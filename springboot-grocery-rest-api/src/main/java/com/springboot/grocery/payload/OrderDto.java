package com.springboot.grocery.payload;


import lombok.Data;

@Data
public class OrderDto {
    private Long id;
    private String store_id;
    private String drone_id;
    private String employee_id;
    private double total_cost;
    private double total_weight;
    private int order_status;
}
