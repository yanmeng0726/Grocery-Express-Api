package com.springboot.grocery.controller;

import com.springboot.grocery.payload.RoleDto;
import com.springboot.grocery.service.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/roles")
public class RoleController {
    private RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }
    @PostMapping
    public ResponseEntity<RoleDto> createOrder(@RequestBody RoleDto roleDto){

        return new ResponseEntity<>(roleService.createRole(roleDto), HttpStatus.CREATED);
    }
}
