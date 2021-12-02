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
    public UserDto createUser(UserDto userDto) {
        System.out.println("hittttttttttttttttt");
        User user = mapToEntity(userDto);
        User newUser = userRepository.save(user);
        UserDto userResponse = mapToDTO(newUser);
        return userResponse;
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
        userDto.setFirst_name(user.getFirst_name());
        userDto.setLast_name(user.getLast_name());
        userDto.setPhone(user.getPhone());
        userDto.setUser_name(user.getUser_name());
//        userDto.setPassword(user.getPassword());
        userDto.setCredits(user.getCredits());
        userDto.setCustomer_rating(user.getCustomer_rating());
        userDto.setAddress(user.getAddress());
        userDto.setIs_manager(user.getIs_manager());
        return userDto;
    }


    private User mapToEntity(UserDto userDto){
        User user = new User();
        user.setId(userDto.getId());
        user.setFirst_name(userDto.getFirst_name());
        user.setLast_name(userDto.getLast_name());
        user.setPhone(userDto.getPhone());
        user.setUser_name(userDto.getUser_name());
        user.setPassword(userDto.getPassword());
        user.setCredits(userDto.getCredits());
        user.setCustomer_rating(userDto.getCustomer_rating());
        user.setAddress(userDto.getAddress());
        user.setIs_manager(userDto.getIs_manager());
        return user;
    }
}
