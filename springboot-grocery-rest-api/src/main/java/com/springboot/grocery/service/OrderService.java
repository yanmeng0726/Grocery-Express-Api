package com.springboot.grocery.service;

import com.springboot.grocery.payload.OrderDto;

import java.util.List;

public interface OrderService {
    OrderDto createOrder(long store_id,OrderDto orderDto );
    List<OrderDto> getOrdersByStoreId(long store_id);
    OrderDto updateOrder(long store_id, long order_id, OrderDto orderDto);


}
