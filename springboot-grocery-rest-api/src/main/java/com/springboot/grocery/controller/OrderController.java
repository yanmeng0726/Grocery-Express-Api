package com.springboot.grocery.controller;

import com.springboot.grocery.payload.OrderDto;
import com.springboot.grocery.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping
public class OrderController {
    private OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/stores/{store_id}/orders")
    public ResponseEntity<OrderDto> createOrder(@PathVariable(value = "store_id") long store_id,
                                                @RequestBody OrderDto orderDto){

        return new ResponseEntity<>(orderService.createOrder(store_id, orderDto), HttpStatus.CREATED);
    }



    @PutMapping("/{order_id}")
    public ResponseEntity<OrderDto> updateOrder(@PathVariable(value = "store_id") Long store_id,
                                                @PathVariable(value = "order_id") Long order_id,
                                                @RequestBody OrderDto orderDto){
        OrderDto updatedOrder = orderService.updateOrder(store_id, order_id, orderDto);
        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }


}
