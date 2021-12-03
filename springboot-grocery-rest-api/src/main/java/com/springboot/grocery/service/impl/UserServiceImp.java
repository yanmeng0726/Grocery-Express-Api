package com.springboot.grocery.service.impl;

import com.springboot.grocery.entity.User;
import com.springboot.grocery.exception.ResourceNotFoundException;
import com.springboot.grocery.payload.UserDto;
import com.springboot.grocery.repository.UserRepository;
import com.springboot.grocery.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImp implements UserService {

    private UserRepository userRepository;

    public UserServiceImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public List<UserDto> getAllCustomers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user->mapToDTO(user)).collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(long id) {
        User user = userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("User", "id", id));
        return mapToDTO(user);
    }


    private UserDto mapToDTO(User user){
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setPhone(user.getPhone());
        userDto.setCredits(user.getCredits());
        userDto.setCustomer_rating(user.getCustomer_rating());
        userDto.setAddress(user.getAddress());
        userDto.setIs_manager(user.getIs_manager());
        return userDto;
    }


}
