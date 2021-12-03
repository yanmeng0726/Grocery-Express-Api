package com.springboot.grocery.payload;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class UserDto {
    private long id;
    @NotEmpty
    @Size(max = 50, message = " name should have at most 50 characters ")
    private String name;
    @NotEmpty
    private String username;
    private String email;
    private String phone;
    private String address;
    private String customer_rating;
    private double credits;
    @NotEmpty
    private Boolean is_manager;

}
