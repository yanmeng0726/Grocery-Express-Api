package com.springboot.grocery.service.impl;

import com.springboot.grocery.entity.Item;
import com.springboot.grocery.entity.Store;
import com.springboot.grocery.exception.ResourceNotFoundException;
import com.springboot.grocery.payload.ItemDto;
import com.springboot.grocery.repository.ItemRepository;
import com.springboot.grocery.repository.StoreRepository;
import com.springboot.grocery.service.ItemService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemServiceImp implements ItemService {

    private ItemRepository itemRepository;
    private StoreRepository storeRepository;
    private ModelMapper mapper;

    public ItemServiceImp(ItemRepository itemRepository,StoreRepository storeRepository,ModelMapper mapper){
        this.itemRepository = itemRepository;
        this.storeRepository = storeRepository;
        this.mapper = mapper;
    }

    @Override
    public ItemDto createItem(long store_id, ItemDto itemDto){
        Item item = mapToEntity(itemDto);
        Store store = storeRepository.findById(store_id).orElseThrow(
                ()->new ResourceNotFoundException("Store","id",store_id)
        );
        item.setStore(store);
        Item newItem = itemRepository.save(item);
        return mapToDTO(newItem);
    }

    @Override
    public List<ItemDto> getItemsByStoreId(long store_id){
        List<Item> items = itemRepository.findByStoreId(store_id);
        return items.stream().map(item -> mapToDTO(item)).collect(Collectors.toList());

    }


    private ItemDto mapToDTO(Item item) {
        ItemDto itemDto = mapper.map(item, ItemDto.class);
//        ItemDto itemDto = new ItemDto();
//        itemDto.setId(item.getId());
//        itemDto.setWeight(item.getWeight());
//        itemDto.setName(item.getName());
//        itemDto.setUnit_price(item.getUnit_price());
        return itemDto;
    }

    private Item mapToEntity(ItemDto itemDto){
        Item item = mapper.map(itemDto,Item.class);
//        Item item = new Item();
//        item.setId(itemDto.getId());
//        item.setWeight(itemDto.getWeight());
//        item.setUnit_price(itemDto.getUnit_price());
//        item.setName(itemDto.getName());
        return item;
    }


}
