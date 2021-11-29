package com.springboot.grocery.controller;

import com.springboot.grocery.payload.EmployeeDto;
import com.springboot.grocery.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stores/{store_id}/employees")
public class EmployeeController {
    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@PathVariable(value = "store_id") long store_id,
                                                   @RequestBody EmployeeDto employeeDto){
        return new ResponseEntity<>(employeeService.createEmployee(store_id, employeeDto), HttpStatus.CREATED);
    }

    @GetMapping
    public List<EmployeeDto> getEmployeesByStoreId(@PathVariable(value = "store_id") Long store_id){
        return employeeService.getEmployeesByStoreId(store_id);
    }

    @PutMapping("/{employee_id}")
    public ResponseEntity<EmployeeDto> updateEmployeeStatus(@PathVariable(value = "store_id") Long store_id,
                                                @PathVariable(value = "employee_id") Long employee_id,
                                                @RequestBody EmployeeDto employeeDto){
        EmployeeDto updatedEmployee = employeeService.updateEmployeeStatus(store_id, employee_id, employeeDto);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

}
