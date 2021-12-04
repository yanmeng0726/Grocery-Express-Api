package com.springboot.grocery.payload;

import lombok.Data;

import java.util.List;

@Data
public class LinesDto {
    private List<LineDto> lines;
}
