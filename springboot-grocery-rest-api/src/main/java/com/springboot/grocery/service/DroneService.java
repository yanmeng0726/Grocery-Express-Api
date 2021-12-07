package com.springboot.grocery.service;

import com.springboot.grocery.payload.DroneDto;

import java.util.List;

public interface DroneService {
    DroneDto createDrone(long store_id, DroneDto droneDto);
    List<DroneDto> getDronesByStoreId(long store_id);
    DroneDto updateDrone(long store_id, long drone_id,DroneDto droneDto);
    double getMaxWeightLimitByStoreId(long id);
    Boolean hasPendingOrder(long drone_id);

}
