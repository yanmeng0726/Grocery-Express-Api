package com.springboot.grocery.service;

import com.springboot.grocery.payload.UserDto;
import java.util.List;

public interface UserService {

    UserDto createUser(UserDto userDto);

    List<UserDto> getAllCustomers();

    UserDto getUserById(long id);


}
