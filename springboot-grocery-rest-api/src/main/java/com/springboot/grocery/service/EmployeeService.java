package com.springboot.grocery.service;

import com.springboot.grocery.payload.EmployeeDto;
import java.util.List;

public interface EmployeeService {

    EmployeeDto createEmployee(long store_id, EmployeeDto employeeDto);

    List<EmployeeDto> getEmployeesByStoreId(long store_id);

    EmployeeDto updateEmployeeStatus(long store_id,long employee_id,EmployeeDto employeeDto);
}
