package com.springboot.grocery.controller;

import com.springboot.grocery.payload.LineDto;
import com.springboot.grocery.service.LineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/stores/{store_id}/orders/{order_id}/lines")
public class LineController {
    private LineService lineService;

    public LineController(LineService lineService) {
        this.lineService = lineService;
    }

    @PostMapping
    public ResponseEntity<LineDto> createLine(@PathVariable(value = "store_id") long store_id,
                                              @PathVariable(value = "order_id") long order_id,
                                              @RequestBody LineDto lineDto){
        return new ResponseEntity<>(lineService.createLine(store_id, order_id, lineDto), HttpStatus.CREATED);
    }

    @GetMapping
    public List<LineDto> getLinesByOrderId(@PathVariable(value = "order_id") Long order_id){
        return lineService.getLinesByOrderId(order_id);
    }
}
