package com.springboot.grocery.repository;

import com.springboot.grocery.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item>findByStoreId(long store_id);

}
