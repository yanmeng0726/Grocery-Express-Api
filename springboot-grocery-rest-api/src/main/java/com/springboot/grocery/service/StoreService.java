package com.springboot.grocery.service;

import com.springboot.grocery.payload.StoreDto;
import java.util.List;

public interface StoreService {
    StoreDto createStore(StoreDto storeDto);
    List<StoreDto> getAllStores();
    StoreDto getStoreById(long id);
}
