package com.springboot.grocery.repository;

import com.springboot.grocery.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
 @Query(value = "SELECT * FROM `order` WHERE user_id = ?1", nativeQuery = true)
 List<Order> findByUserId(long user_id);


 @Query(value = "SELECT * FROM `order` WHERE store_id = ?1 And order_status = 1", nativeQuery = true)
 List<Order> getPendingIncomeByStoreId(long store_id);
}
