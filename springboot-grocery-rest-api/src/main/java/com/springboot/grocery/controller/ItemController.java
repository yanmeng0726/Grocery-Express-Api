package com.springboot.grocery.controller;

import com.springboot.grocery.payload.ItemDto;
import com.springboot.grocery.service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/stores/{store_id}/items")

public class ItemController {
    private ItemService itemService;

    public ItemController(ItemService itemService){ this.itemService = itemService;}

    @PostMapping
    public ResponseEntity<ItemDto> createItem(@PathVariable(value = "store_id") long store_id,
                                              @RequestBody ItemDto itemDto){
        return new ResponseEntity<>(itemService.createItem(store_id, itemDto),HttpStatus.CREATED);
    }

    @GetMapping
    public List<ItemDto> getItemsByStoreId(@PathVariable(value = "store_id") Long store_id){
        return itemService.getItemsByStoreId(store_id);
    }



}





