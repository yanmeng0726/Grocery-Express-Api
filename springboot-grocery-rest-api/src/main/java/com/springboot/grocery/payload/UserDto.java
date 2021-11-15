package com.springboot.grocery.payload;

import lombok.Data;

@Data
public class UserDto {
    private long id;
    private String first_name;
    private String last_name;
    private String phone;
    private String user_name;
    private String password;
    private String address;
    private String customer_rating;
    private String credits;
    private Boolean is_manager;

}
