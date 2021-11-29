package com.springboot.grocery.payload;

import lombok.Data;

@Data
public class EmployeeDto{
    private Long id;
    private String first_name;
    private String last_name;
    private String phone;
    private String ssn;
    private String store_id;
    private String license_id;
    private int experience;
    private String expiration_date;
    private Boolean is_free;
}
