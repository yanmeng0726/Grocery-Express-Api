package com.springboot.grocery.service;

import com.springboot.grocery.payload.ItemDto;

import java.util.List;

public interface ItemService {
    ItemDto createItem(long store_id,ItemDto itemDto);
    List<ItemDto> getItemsByStoreId(long store_id);

}
