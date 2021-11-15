package com.springboot.grocery.repository;

import com.springboot.grocery.entity.Drone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DroneRepository extends JpaRepository<Drone,Long> {
    List<Drone>findByStoreId(long store_id);


}
