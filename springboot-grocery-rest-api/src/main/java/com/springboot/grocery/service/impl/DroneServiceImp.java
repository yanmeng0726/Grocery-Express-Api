package com.springboot.grocery.service.impl;

import com.springboot.grocery.entity.Drone;
import com.springboot.grocery.entity.Store;
import com.springboot.grocery.exception.GroceryAPIException;
import com.springboot.grocery.exception.ResourceNotFoundException;
import com.springboot.grocery.payload.DroneDto;
import com.springboot.grocery.repository.DroneRepository;
import com.springboot.grocery.repository.StoreRepository;
import com.springboot.grocery.service.DroneService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DroneServiceImp implements DroneService {

    private DroneRepository droneRepository;
    private StoreRepository storeRepository;
    private ModelMapper mapper;

    public DroneServiceImp(DroneRepository droneRepository, StoreRepository storeRepository, ModelMapper mapper) {
        this.droneRepository = droneRepository;
        this.storeRepository = storeRepository;
        this.mapper = mapper;
    }

    @Override
    public DroneDto createDrone(long store_id, DroneDto droneDto) {
        Drone drone = mapToEntity(droneDto);
        Store store = storeRepository.findById(store_id).orElseThrow(
                ()->new ResourceNotFoundException("Store", "id", store_id)
        );
        drone.setStore(store);
        Drone newDrone = droneRepository.save(drone);
        return mapToDTO(newDrone);
    }

    @Override
    public List<DroneDto> getDronesByStoreId(long store_id) {
        List<Drone> drones = droneRepository.findByStoreId(store_id);
        // convert list of comment entities to list of comment dto's
        return drones.stream().map(drone -> mapToDTO(drone)).collect(Collectors.toList());
    }

    @Override
    public DroneDto updateDrone(long store_id, long drone_id, DroneDto droneRequest) {
        Store store = storeRepository.findById(store_id).orElseThrow(
                () -> new ResourceNotFoundException("Store", "id", store_id));

        Drone drone = droneRepository.findById(drone_id).orElseThrow(() ->
                new ResourceNotFoundException("Drone", "id", drone_id));

        if(!drone.getStore().getId().equals(store.getId())){
            throw new GroceryAPIException(HttpStatus.BAD_REQUEST, "Drone does not belongs to store");
        }

        drone.setStatus(droneRequest.getStatus());
        drone.setTrips_left(droneRequest.getTrips_left());

        Drone updatedDrone = droneRepository.save(drone);
        return mapToDTO(updatedDrone);
    }


    private DroneDto mapToDTO(Drone drone){
        DroneDto droneDto = mapper.map(drone, DroneDto.class);
//        DroneDto droneDto = new DroneDto();
//        droneDto.setId(drone.getId());
//        droneDto.setStatus(drone.getStatus());
//        droneDto.setTrips_left(drone.getTrips_left());
//        droneDto.setWeight_limit(drone.getWeight_limit());
        return droneDto;
    }

    private Drone mapToEntity(DroneDto droneDto){
        Drone drone = mapper.map(droneDto,Drone.class);
//        Drone drone = new Drone();
//        drone.setId(droneDto.getId());
//        drone.setStatus(droneDto.getStatus());
//        drone.setTrips_left(droneDto.getTrips_left());
//        drone.setWeight_limit(droneDto.getWeight_limit());
        return drone ;
    }

}
