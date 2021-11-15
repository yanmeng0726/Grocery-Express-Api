package com.springboot.grocery.controller;

import com.springboot.grocery.payload.UserDto;
import com.springboot.grocery.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping ("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // create
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        return new ResponseEntity<>(userService.createUser(userDto), HttpStatus.CREATED);
    }

    // get all
    @GetMapping
    public List<UserDto> getAllUsers(){
        return userService.getAllCustomers();
    }

    // get by id
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable(name = "id") long id){
        return ResponseEntity.ok(userService.getUserById(id));
    }

}
