package com.springboot.grocery.service.impl;

import com.springboot.grocery.entity.*;
import com.springboot.grocery.exception.GroceryAPIException;
import com.springboot.grocery.exception.ResourceNotFoundException;
import com.springboot.grocery.payload.LineDto;
import com.springboot.grocery.payload.LinesDto;
import com.springboot.grocery.repository.*;
import com.springboot.grocery.service.LineService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LineServiceImp implements LineService {
    private OrderRepository orderRepository;
    private ItemRepository itemRepository;
    private ModelMapper mapper;
    private StoreRepository storeRepository;
    private LineRepository lineRepository;
    private UserRepository userRepository;

    public LineServiceImp(UserRepository userRepository, LineRepository lineRepository, OrderRepository orderRepository, ItemRepository itemRepository, ModelMapper mapper, StoreRepository storeRepository) {
        this.orderRepository = orderRepository;
        this.itemRepository = itemRepository;
        this.mapper = mapper;
        this.storeRepository = storeRepository;
        this.lineRepository = lineRepository;
        this.userRepository = userRepository;
    }

    @Override
    public LinesDto createLine(long store_id, long order_id, LinesDto linesDto) {

        LinesDto newLinesDto = new LinesDto();
        List<LineDto> lines = new ArrayList<>();
        Store store = storeRepository.findById(store_id).orElseThrow(
                ()->new ResourceNotFoundException("Store","id",store_id)
        );
        Order order = orderRepository.findById(order_id).orElseThrow(
                ()->new ResourceNotFoundException("Order","id",order_id)
        );

        User user =  userRepository.findById(order.getUser_id()).get();
        double orderCost = 0.00;
        double orderWeight = 0.00;
        for (int i = 0; i < linesDto.getLines().size(); i++) {
            long id = linesDto.getLines().get(i).getItem_id();
            Item item = itemRepository.findById(id).orElseThrow(
                    ()->new ResourceNotFoundException("item","id",id)
            );
            orderCost += linesDto.getLines().get(i).getQuantity() * item.getUnit_price();
            orderWeight += linesDto.getLines().get(i).getQuantity() * item.getWeight();}

        double adjustedCredit = user.getCredits() - orderCost;
        if(adjustedCredit < 0){
            throw new GroceryAPIException(HttpStatus.BAD_REQUEST, "credits are not enough");
        }
        user.setCredits(adjustedCredit);
        userRepository.save(user);
        order.setTotal_weight(orderWeight);
        order.setTotal_cost(orderCost);
        orderRepository.save(order);

        linesDto.getLines().stream().forEach((lineDto)->{
            Line line = mapToEntity(lineDto);

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
            LineDto newLineDto = mapToDto(newLine, item);
            lines.add(newLineDto);
        }

        );
        newLinesDto.setLines(lines);
        return newLinesDto;
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
