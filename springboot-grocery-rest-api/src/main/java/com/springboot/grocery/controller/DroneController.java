package com.springboot.grocery.controller;


import com.springboot.grocery.payload.DroneDto;
import com.springboot.grocery.service.DroneService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stores/{store_id}/drones")
public class DroneController {
    private DroneService droneService;

    public DroneController(DroneService droneService) {
        this.droneService = droneService;
    }

    @PostMapping
    public ResponseEntity<DroneDto> createDrone(@PathVariable(value = "store_id") long store_id,
                                                @RequestBody DroneDto droneDto){
        return new ResponseEntity<>(droneService.createDrone(store_id, droneDto), HttpStatus.CREATED);
    }

    @GetMapping
    public List<DroneDto> getDronesByStoreId(@PathVariable(value = "store_id") Long store_id){
        return droneService.getDronesByStoreId(store_id);
    }

    @PutMapping("/{drone_id}")
    public ResponseEntity<DroneDto> updateDrone(@PathVariable(value = "store_id") Long store_id,
                                                    @PathVariable(value = "drone_id") Long drone_id,
                                                    @RequestBody DroneDto droneDto){
        DroneDto updatedDrone = droneService.updateDrone(store_id, drone_id, droneDto);
        return new ResponseEntity<>(updatedDrone, HttpStatus.OK);
    }

}
