package com.springboot.grocery.service;

import com.springboot.grocery.payload.LineDto;

import java.util.List;

public interface LineService {
    LineDto createLine(long store_id, long order_id, LineDto lineDto);
    List<LineDto> getLinesByOrderId(long order_id);
}
