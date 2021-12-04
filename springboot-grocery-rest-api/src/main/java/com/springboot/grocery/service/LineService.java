package com.springboot.grocery.service;

import com.springboot.grocery.payload.LineDto;
import com.springboot.grocery.payload.LinesDto;

import java.util.List;

public interface LineService {
    LinesDto createLine(long store_id, long order_id, LinesDto linesDto);
    List<LineDto> getLinesByOrderId(long order_id);
}
