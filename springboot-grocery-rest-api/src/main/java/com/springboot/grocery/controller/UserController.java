package com.springboot.grocery.controller;

import com.springboot.grocery.payload.OrderDto;
import com.springboot.grocery.payload.UserDto;
import com.springboot.grocery.service.OrderService;
import com.springboot.grocery.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping ("/users")
public class UserController {

    private UserService userService;
    private OrderService orderService;

    public UserController(UserService userService, OrderService orderService) {

        this.userService = userService;
        this.orderService = orderService;
    }

    // get all
    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping
    public List<UserDto> getAllUsers(){
        return userService.getAllCustomers();
    }

    // get by id
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable(name = "id") long id){
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("/{id}/orders")
    public List<OrderDto> getOrdersByUserId(@PathVariable(value = "id") Long id){
        return orderService.getOrdersByUserId(id);
    }

}
