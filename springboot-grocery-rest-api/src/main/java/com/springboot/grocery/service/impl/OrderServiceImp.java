package com.springboot.grocery.service.impl;

import com.springboot.grocery.entity.Drone;
import com.springboot.grocery.entity.Employee;
import com.springboot.grocery.entity.Order;
import com.springboot.grocery.entity.Store;
import com.springboot.grocery.exception.ResourceNotFoundException;
import com.springboot.grocery.payload.OrderDto;
import com.springboot.grocery.repository.DroneRepository;
import com.springboot.grocery.repository.EmployeeRepository;
import com.springboot.grocery.repository.OrderRepository;
import com.springboot.grocery.repository.StoreRepository;
import com.springboot.grocery.service.OrderService;
import org.modelmapper.ModelMapper;
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

    public OrderServiceImp(OrderRepository orderRepository,EmployeeRepository employeeRepository, DroneRepository droneRepository, StoreRepository storeRepository, ModelMapper mapper){
        this.droneRepository = droneRepository;
        this.storeRepository = storeRepository;
        this.employeeRepository = employeeRepository;
        this.orderRepository = orderRepository;
        this.mapper = mapper;
    }

    @Override
    public OrderDto createOrder(long store_id, OrderDto orderDto) {
        Order order = mapToEntity(orderDto);
        Store store = storeRepository.findById(store_id).orElseThrow(
                ()->new ResourceNotFoundException("Store","id",store_id)
        );
        order.setStore(store);
        Order newOrder = orderRepository.save(order);

        return mapToDTO(newOrder);
    }

    @Override
    public List<OrderDto> getOrdersByStoreId(long store_id) {
        List<Order> orders = orderRepository.findByStoreId(store_id);
        return orders.stream().map(order -> mapToDTO(order)).collect(Collectors.toList());
    }

    @Override
    public OrderDto updateOrder(long store_id, long order_id, OrderDto orderRequest) {
        Store store = storeRepository.findById(store_id).orElseThrow(
                () -> new ResourceNotFoundException("Store", "id", store_id));

        Order order = orderRepository.findById(order_id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "id", order_id));

        if(orderRequest.getDrone_id() != null){
            Drone drone = droneRepository.findById(Long.parseLong(orderRequest.getDrone_id())).orElseThrow(
                    () -> new ResourceNotFoundException("Drone", "id", Long.parseLong(orderRequest.getDrone_id())));
        }

        if(orderRequest.getEmployee_id() != null){
            Employee employee = employeeRepository.findById(Long.parseLong(orderRequest.getEmployee_id())).orElseThrow(
                    () -> new ResourceNotFoundException("Employee", "id", Long.parseLong(orderRequest.getEmployee_id())));
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
        orderDto.setDrone_id(order.getDrone_id());
        orderDto.setOrder_status(order.getOrder_status());
        orderDto.setEmployee_id(order.getEmployee_id());
        order.setTotal_cost(order.getTotal_cost());
        order.setTotal_weight(order.getTotal_weight());
        return orderDto;
    }

    private Order mapToEntity(OrderDto orderDto){
        Order order = new Order();
        order.setId(orderDto.getId());
        order.setDrone_id(orderDto.getDrone_id());
        order.setOrder_status(orderDto.getOrder_status());
        order.setEmployee_id(orderDto.getEmployee_id());
        order.setTotal_cost(orderDto.getTotal_cost());
        order.setTotal_weight(orderDto.getTotal_weight());
        return order;
    }
}
