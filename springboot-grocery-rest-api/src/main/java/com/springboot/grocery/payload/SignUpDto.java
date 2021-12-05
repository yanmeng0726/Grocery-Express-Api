package com.springboot.grocery.payload;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class SignUpDto {
    @NotNull
    private String name;
    @NotNull
    private String username;
    @NotNull
    private String email;
    @NotNull
    private String password;
    private String phone;
    private String address;
    private String customer_rating;
    private double credits;
    @NotNull
    private Boolean is_manager;
}
