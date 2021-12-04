package com.springboot.grocery.service.impl;

import com.springboot.grocery.entity.*;
import com.springboot.grocery.exception.GroceryAPIException;
import com.springboot.grocery.exception.ResourceNotFoundException;
import com.springboot.grocery.payload.LineDto;
import com.springboot.grocery.payload.OrderDto;
import com.springboot.grocery.repository.*;
import com.springboot.grocery.service.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImp implements OrderService {
    private ModelMapper mapper;
    private StoreRepository storeRepository;
    private DroneRepository droneRepository;
    private EmployeeRepository employeeRepository;
    private OrderRepository orderRepository;
    private UserRepository userRepository;
    private LineRepository lineRepository;
    private ItemRepository itemRepository;

    public OrderServiceImp(ItemRepository itemRepository, LineRepository lineRepository, OrderRepository orderRepository,EmployeeRepository employeeRepository, DroneRepository droneRepository, StoreRepository storeRepository,UserRepository userRepository, ModelMapper mapper){
        this.droneRepository = droneRepository;
        this.storeRepository = storeRepository;
        this.employeeRepository = employeeRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.lineRepository = lineRepository;
        this.itemRepository = itemRepository;

        this.mapper = mapper;
    }

    @Override
    public OrderDto createOrder(long store_id, OrderDto orderDto) {
        Order order = mapToEntity(orderDto);
        Store store = storeRepository.findById(store_id).orElseThrow(
                ()->new ResourceNotFoundException("Store","id",store_id)
        );

        User user = userRepository.findById(orderDto.getUser_id()).orElseThrow(
                ()->new ResourceNotFoundException("User","id",orderDto.getUser_id())
        );

        if(user.getCredits() < orderDto.getTotal_cost()){
            throw new GroceryAPIException(HttpStatus.BAD_REQUEST, "Credits are not enough to make this order" );
        }

        order.setStore(store);


        OrderDto newOrder = mapToDTO(orderRepository.save(order));
        newOrder.setStore_id(store_id);
        return newOrder;
    }

    @Override
    public List<OrderDto> getOrdersByUserId(long user_id) {
        List<Order> orders = orderRepository.findByUserId(user_id);
        return orders.stream().map(order -> mapToDTO(order)).collect(Collectors.toList());
    }

    @Override
    public double getPendingIncomeByStoreId(long store_id) {
        List<Order> orders = orderRepository.getPendingIncomeByStoreId(store_id);
        double income = 0.00;
        for (int i = 0; i < orders.size(); i++) {
            income = income + orders.get(i).getTotal_cost();
        }
        return income;
    }

    @Override
    public void deleteOrder(long store_id, long order_id) {

        Store store = storeRepository.findById(store_id).orElseThrow(
                ()->new ResourceNotFoundException("Store","id",store_id)
        );
        Order order = orderRepository.findById(order_id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "id", order_id));
        if(!order.getStore().getId().equals(store.getId())){
            throw new GroceryAPIException(HttpStatus.BAD_REQUEST, "Order does not belongs to store");
        }
        List<Line>lines =  lineRepository.findByOrderId( order_id);
        for (int i = 0; i < lines.size(); i++) {
            lineRepository.deleteById(lines.get(i).getId());
        }
        orderRepository.delete(order);
    }

    @Override
    public OrderDto updateOrder(long store_id, long order_id, OrderDto orderRequest) {
        Store store = storeRepository.findById(store_id).orElseThrow(
                () -> new ResourceNotFoundException("Store", "id", store_id));

        Order order = orderRepository.findById(order_id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "id", order_id));

        if(orderRequest.getDrone_id() != null){
            Drone drone = droneRepository.findById(orderRequest.getDrone_id()).orElseThrow(
                    () -> new ResourceNotFoundException("Drone", "id", orderRequest.getDrone_id()));
        }

        if(orderRequest.getEmployee_id() != null){
            Employee employee = employeeRepository.findById(orderRequest.getEmployee_id()).orElseThrow(
                    () -> new ResourceNotFoundException("Employee", "id", orderRequest.getEmployee_id()));
        }
        order.setOrder_status(orderRequest.getOrder_status());
        order.setDrone_id(orderRequest.getDrone_id());
        order.setEmployee_id(orderRequest.getEmployee_id());
        Order updatedOrder = orderRepository.save(order);
        return mapToDTO(updatedOrder);

    }

    private OrderDto mapToDTO(Order order){
        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
        orderDto.setUser_id(order.getUser_id());
        orderDto.setDrone_id(order.getDrone_id());
        orderDto.setStore_id(order.getStore().getId());
        orderDto.setOrder_status(order.getOrder_status());
        orderDto.setEmployee_id(order.getEmployee_id());
        orderDto.setTotal_cost(order.getTotal_cost());
        orderDto.setTotal_weight(order.getTotal_weight());
        List<Line>lines = lineRepository.findByOrderId(order.getId());
        orderDto.setLines( lines.stream().map(line -> lineMapToDto(line, itemRepository.findById(line.getItem_id()).orElseThrow(()->new ResourceNotFoundException("Item","id",line.getItem_id())))).collect(Collectors.toList()));
        return orderDto;
    }

    private Order mapToEntity(OrderDto orderDto){
        Order order = new Order();
        order.setId(orderDto.getId());
        order.setUser_id(orderDto.getUser_id());
        order.setDrone_id(orderDto.getDrone_id());
        order.setOrder_status(orderDto.getOrder_status());
        order.setEmployee_id(orderDto.getEmployee_id());
        order.setTotal_cost(orderDto.getTotal_cost());
        order.setTotal_weight(orderDto.getTotal_weight());
        return order;
    }

    private LineDto lineMapToDto(Line line, Item item){
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
}
