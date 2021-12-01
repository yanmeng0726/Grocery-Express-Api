package com.springboot.grocery.service.impl;
import com.springboot.grocery.entity.Item;

import com.springboot.grocery.entity.Line;
import com.springboot.grocery.entity.Order;
import com.springboot.grocery.entity.Store;
import com.springboot.grocery.exception.ResourceNotFoundException;
import com.springboot.grocery.payload.LineDto;
import com.springboot.grocery.repository.ItemRepository;
import com.springboot.grocery.repository.LineRepository;
import com.springboot.grocery.repository.OrderRepository;
import com.springboot.grocery.repository.StoreRepository;
import com.springboot.grocery.service.LineService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LineServiceImp implements LineService {
    private OrderRepository orderRepository;
    private ItemRepository itemRepository;
    private ModelMapper mapper;
    private StoreRepository storeRepository;
    private LineRepository lineRepository;

    public LineServiceImp(LineRepository lineRepository, OrderRepository orderRepository, ItemRepository itemRepository, ModelMapper mapper, StoreRepository storeRepository) {
        this.orderRepository = orderRepository;
        this.itemRepository = itemRepository;
        this.mapper = mapper;
        this.storeRepository = storeRepository;
        this.lineRepository = lineRepository;
    }

    @Override
    public LineDto createLine(long store_id, long order_id, LineDto lineDto) {
        Line line = mapToEntity(lineDto);
        Store store = storeRepository.findById(store_id).orElseThrow(
                ()->new ResourceNotFoundException("Store","id",store_id)
        );
        Order order = orderRepository.findById(lineDto.getOrder_id()).orElseThrow(
                ()->new ResourceNotFoundException("Order","id",lineDto.getOrder_id())
        );

        Item item = itemRepository.findById(lineDto.getItem_id()).orElseThrow(
                ()->new ResourceNotFoundException("item","id",lineDto.getItem_id())
        );

        if(order.getStore().getId()!= store_id){
            throw new ResourceNotFoundException("Order","id",lineDto.getOrder_id());
        }

        if(item.getStore().getId()!= store_id){
            throw new ResourceNotFoundException("item","id",lineDto.getItem_id());
        }
        Line newLine = lineRepository.save(line);
        return mapToDto(newLine, item);
    }

    @Override
    public List<LineDto> getLinesByOrderId(long order_id) {
        Order order = orderRepository.findById(order_id).orElseThrow(
                ()->new ResourceNotFoundException("Order","id",order_id));
        List<Line>lines = lineRepository.findByOrderId(order_id);
        return lines.stream().map(line -> mapToDto(line, itemRepository.findById(line.getItem_id()).orElseThrow(()->new ResourceNotFoundException("Item","id",line.getItem_id())))).collect(Collectors.toList());
    }

    private LineDto mapToDto(Line line, Item item){
        LineDto lineDto = new LineDto();
        lineDto.setId(line.getId());
        lineDto.setQuantity(line.getQuantity());
        lineDto.setOrder_id(line.getOrder_id());
        lineDto.setItem_id(line.getItem_id());
        lineDto.setName(item.getName());
        lineDto.setWeight(item.getWeight());
        lineDto.setUnit_price(item.getUnit_price());

        return lineDto;
    }

    private Line mapToEntity(LineDto lineDto){
        Line line = new Line();
        line.setId(lineDto.getId());
        line.setOrder_id(lineDto.getOrder_id());
        line.setQuantity(lineDto.getQuantity());
        line.setItem_id(lineDto.getItem_id());
//        Line line = mapper.map(lineDto, Line.class);
        return line;
    }
}