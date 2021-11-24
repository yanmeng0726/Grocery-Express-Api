package com.springboot.grocery.repository;

import com.springboot.grocery.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStoreId(long store_id);
}
