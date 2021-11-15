package com.springboot.grocery.service.impl;

import com.springboot.grocery.entity.Store;
import com.springboot.grocery.exception.ResourceNotFoundException;
import com.springboot.grocery.payload.StoreDto;
import com.springboot.grocery.repository.StoreRepository;
import com.springboot.grocery.service.StoreService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StoreServiceImp implements StoreService {

    private StoreRepository storeRepository;

    public StoreServiceImp(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    @Override
    public StoreDto createStore(StoreDto storeDto) {
        Store store = mapToEntity(storeDto);
        Store newStore = storeRepository.save(store);
        StoreDto storeResponse = mapToDTO(newStore);
        return storeResponse;
    }

    @Override
    public List<StoreDto> getAllStores() {
        List<Store> stores = storeRepository.findAll();
        return stores.stream().map(store -> mapToDTO(store)).collect(Collectors.toList());
    }

    @Override
    public StoreDto getStoreById(long id) {
        Store store = storeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("User", "id", id));
        return mapToDTO(store);
    }

    private StoreDto mapToDTO(Store store){
        StoreDto storeDto = new StoreDto();
        storeDto.setId(store.getId());
        storeDto.setName(store.getName());
        storeDto.setRevenue(store.getRevenue());
        return storeDto;
    }

    private Store mapToEntity(StoreDto storeDto){
        Store store = new Store();
        store.setId(storeDto.getId());
        store.setName(storeDto.getName());
        store.setRevenue(storeDto.getRevenue());
        return store ;
    }


}
