package com.springboot.grocery.service.impl;

import com.springboot.grocery.entity.Drone;
import com.springboot.grocery.entity.Employee;
import com.springboot.grocery.entity.Store;
import com.springboot.grocery.exception.ResourceNotFoundException;
import com.springboot.grocery.payload.DroneDto;
import com.springboot.grocery.payload.EmployeeDto;
import com.springboot.grocery.payload.StoreDto;
import com.springboot.grocery.repository.DroneRepository;
import com.springboot.grocery.repository.EmployeeRepository;
import com.springboot.grocery.repository.StoreRepository;
import com.springboot.grocery.service.StoreService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StoreServiceImp implements StoreService {

    private StoreRepository storeRepository;
    private EmployeeRepository employeeRepository;
    private DroneRepository droneRepository;
    private ModelMapper mapper;

    public StoreServiceImp(StoreRepository storeRepository, EmployeeRepository employeeRepository, DroneRepository droneRepository, ModelMapper mapper) {
        this.storeRepository = storeRepository;
        this.employeeRepository = employeeRepository;
        this.droneRepository = droneRepository;
        this.mapper = mapper;
    }

    @Override
    public StoreDto createStore(StoreDto storeDto) {
        Store store = mapToEntity(storeDto);
        Store newStore = storeRepository.save(store);
        StoreDto storeResponse = mapToDTO(newStore);
        return storeResponse;
    }

    @Override
    public List<StoreDto> getAllStores() {
        List<Store> stores = storeRepository.findAll();
        List<StoreDto> storesDto = new ArrayList<>();
        for(Store store: stores){
            StoreDto storeDto = this.getStoreById(store.getId());
            storesDto.add(storeDto);
        }
        return storesDto;
    }

    @Override
    public StoreDto getStoreById(long id) {
        Store store = storeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("User", "id", id));
        StoreDto storeDto = mapToDTO(store);
        List<Drone> drones = droneRepository.findByStoreId(store.getId());

        List<DroneDto> dronesDto = new ArrayList<>();
        for (Drone drone : drones) {
            DroneDto droneDto = new DroneDto();
            droneDto.setId(drone.getId());
            droneDto.setStatus(drone.getStatus());
            droneDto.setTrips_left(drone.getTrips_left());
            droneDto.setWeight_limit(drone.getWeight_limit());
            dronesDto.add(droneDto);
        }

        storeDto.setDrones(dronesDto);

        List<Employee> employees = employeeRepository.findByStoreId(store.getId());
        System.out.println(employees);
        List<EmployeeDto> employeesDto = new ArrayList<>();
        for (Employee employee : employees) {
            EmployeeDto employeeDto = new EmployeeDto();
            employeeDto.setId(employee.getId());
            employeeDto.setFirst_name(employee.getFirst_name());
            employeeDto.setLast_name(employee.getLast_name());
            employeeDto.setPhone(employee.getPhone());
            employeeDto.setSsn(employee.getSsn());
            employeeDto.setLicense_id(employee.getLicense_id());
            employeeDto.setExperience(employee.getExperience());
            employeeDto.setExpiration_date(employee.getExpiration_date());
            employeeDto.setIs_free(employee.getIs_free());
            employeesDto.add(employeeDto);
        }
        storeDto.setEmployees(employeesDto);
        return storeDto;
    }

    private StoreDto mapToDTO(Store store){
        StoreDto storeDto = mapper.map(store, StoreDto.class);
//        StoreDto storeDto = new StoreDto();
//        storeDto.setId(store.getId());
//        storeDto.setName(store.getName());
//        storeDto.setRevenue(store.getRevenue());
        return storeDto;
    }

    private Store mapToEntity(StoreDto storeDto){
        Store store = mapper.map(storeDto,Store.class);
//        Store store = new Store();
//        store.setId(storeDto.getId());
//        store.setName(storeDto.getName());
//        store.setRevenue(storeDto.getRevenue());
        return store ;
    }


}
