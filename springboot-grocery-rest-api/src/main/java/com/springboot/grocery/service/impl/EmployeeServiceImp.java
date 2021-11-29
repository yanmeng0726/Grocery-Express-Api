package com.springboot.grocery.service.impl;

import com.springboot.grocery.entity.Employee;
import com.springboot.grocery.entity.Store;
import com.springboot.grocery.exception.GroceryAPIException;
import com.springboot.grocery.exception.ResourceNotFoundException;
import com.springboot.grocery.payload.EmployeeDto;
import com.springboot.grocery.repository.EmployeeRepository;
import com.springboot.grocery.repository.StoreRepository;
import com.springboot.grocery.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImp implements EmployeeService {

    private EmployeeRepository employeeRepository;
    private StoreRepository storeRepository;
    private ModelMapper mapper;


    public EmployeeServiceImp(StoreRepository storeRepository,EmployeeRepository employeeRepository) {
        this.storeRepository=storeRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public EmployeeDto createEmployee(long store_id,EmployeeDto employeeDto) {
        Employee employee = mapToEntity(employeeDto);
        Store store = storeRepository.findById(store_id).orElseThrow(
                ()->new ResourceNotFoundException("Store", "id", store_id)
        );
        employee.setStore(store);
        Employee newEmployee = employeeRepository.save(employee);
        return mapToDTO(newEmployee);
    }


    @Override
    public List<EmployeeDto> getEmployeesByStoreId(long store_id) {
        List<Employee> employees = employeeRepository.findByStoreId(store_id);
        return employees.stream().map(employee->mapToDTO(employee)).collect(Collectors.toList());
    }


    @Override
    public EmployeeDto updateEmployeeStatus(long store_id,long employee_id,EmployeeDto employeeRequest){
        Store store = storeRepository.findById(store_id).orElseThrow(
                () -> new ResourceNotFoundException("Store", "id", store_id));

        Employee employee = employeeRepository.findById(employee_id).orElseThrow(() ->
                new ResourceNotFoundException("Employee", "id", employee_id));

        if(!employee.getStore().getId().equals(store.getId())){
            throw new GroceryAPIException(HttpStatus.BAD_REQUEST, "Employee does not belongs to store");
        }

        employee.setIs_free(employeeRequest.getIs_free());

        Employee updatedEmployee = employeeRepository.save(employee);
        return mapToDTO(updatedEmployee);
    }


    private EmployeeDto mapToDTO(Employee employee){

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
        return employeeDto;
    }


    private Employee mapToEntity(EmployeeDto employeeDto){
        Employee employee = new Employee();
        employee.setId(employeeDto.getId());
        employee.setFirst_name(employeeDto.getFirst_name());
        employee.setLast_name(employeeDto.getLast_name());
        employee.setPhone(employeeDto.getPhone());
        employee.setSsn(employeeDto.getSsn());
        employee.setLicense_id(employeeDto.getLicense_id());
        employee.setExperience(employeeDto.getExperience());
        employee.setExpiration_date(employeeDto.getExpiration_date());
        employee.setIs_free(employeeDto.getIs_free());
        return employee;
    }
}
