package com.springboot.grocery.controller;

import com.springboot.grocery.payload.StoreDto;
import com.springboot.grocery.service.DroneService;
import com.springboot.grocery.service.OrderService;
import com.springboot.grocery.service.StoreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/stores")
public class StoreController {
    private StoreService storeService;
    private OrderService orderService;
    private DroneService droneService;

    public StoreController(OrderService orderService, StoreService storeService, DroneService droneService) {
        this.orderService = orderService;
        this.storeService = storeService;
        this.droneService = droneService;
    }

    // create
    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping
    public ResponseEntity<StoreDto> createStore(@Valid @RequestBody StoreDto storeDto){
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
    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/{id}/pendingIncome")
    public double getPendingIncomeByStoreId(@PathVariable(name = "id") long id){

        return orderService.getPendingIncomeByStoreId(id);
    }

    @GetMapping("/{id}/maxWeight")
    public double getMaxWeightLimitByStoreId(@PathVariable(name = "id") long id){
        return droneService.getMaxWeightLimitByStoreId(id);
    }


}
