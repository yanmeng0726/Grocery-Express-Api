package com.springboot.grocery.repository;

import com.springboot.grocery.entity.Drone;
import com.springboot.grocery.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DroneRepository extends JpaRepository<Drone,Long> {
    List<Drone>findByStoreId(long store_id);
    @Query(value = "SELECT MAX(weight_limit) FROM drone WHERE store_id = ?1", nativeQuery = true)
    double getMaxWeightLimitByStoreId(long store_id);

    @Query(value = "SELECT * FROM order WHERE drone_id = ?1 And order_status = 1 ", nativeQuery = true)
    List<Order> hasPendingOrder(long drone_id );
}
