package com.springboot.grocery.payload;

import lombok.Data;

@Data
public class SignUpDto {
    private String name;
    private String username;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String customer_rating;
    private double credits;
    private Boolean is_manager;
}
