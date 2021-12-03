package com.springboot.grocery.payload;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class EmployeeDto{
    private Long id;
    @NotEmpty
    @Size(max = 10, message = " first name should have at most 10 characters ")
    private String first_name;
    @NotEmpty
    @Size(max = 10, message = " last name should have at most 10 characters ")
    private String last_name;
    private String phone;
    @NotEmpty
    private String ssn;
    private String store_id;
    @NotEmpty
    private String license_id;
    private int experience;
    @NotEmpty
    private String expiration_date;
    private Boolean is_free;
}
