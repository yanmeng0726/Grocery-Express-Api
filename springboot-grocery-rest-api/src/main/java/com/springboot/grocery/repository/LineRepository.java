package com.springboot.grocery.repository;

import com.springboot.grocery.entity.Line;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LineRepository extends JpaRepository<Line, Long> {
    @Query(value = "SELECT * FROM line WHERE order_id = ?1", nativeQuery = true)
    List<Line> findByOrderId(long order_id);
}
