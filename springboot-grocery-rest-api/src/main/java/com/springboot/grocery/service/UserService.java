package com.springboot.grocery.service;

import com.springboot.grocery.payload.UserDto;
import java.util.List;

public interface UserService {


    List<UserDto> getAllCustomers();

    UserDto getUserById(long id);


}
