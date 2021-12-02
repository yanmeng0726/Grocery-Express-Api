package com.springboot.grocery.controller;

import com.springboot.grocery.payload.StoreDto;
import com.springboot.grocery.service.OrderService;
import com.springboot.grocery.service.StoreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/stores")
public class StoreController {
    private StoreService storeService;
    private OrderService orderService;

    public StoreController(OrderService orderService, StoreService storeService) {
        this.orderService = orderService;
        this.storeService = storeService;
    }

    // create
    @PostMapping
    public ResponseEntity<StoreDto> createStore(@RequestBody StoreDto storeDto){
        return new ResponseEntity<>(storeService.createStore(storeDto), HttpStatus.CREATED);
    }

    // get all
    @GetMapping
    public List<StoreDto> getAllStores(){
        return storeService.getAllStores();
    }

    // get by id
    @GetMapping("/{id}")
    public ResponseEntity<StoreDto> getStoreById(@PathVariable(name = "id") long id){
        return ResponseEntity.ok(storeService.getStoreById(id));
    }

    // get by id
    @GetMapping("/{id}/pendingIncome")
    public double getPendingIncomeByStoreId(@PathVariable(name = "id") long id){

        return orderService.getPendingIncomeByStoreId(id);
    }


}
