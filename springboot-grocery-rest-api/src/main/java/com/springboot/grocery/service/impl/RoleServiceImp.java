package com.springboot.grocery.service.impl;

import com.springboot.grocery.payload.RoleDto;
import com.springboot.grocery.repository.RoleRepository;
import com.springboot.grocery.service.RoleService;
import org.springframework.stereotype.Service;
import com.springboot.grocery.entity.Role;

@Service
public class RoleServiceImp implements RoleService {
    private RoleRepository roleRepository;

    public RoleServiceImp(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public RoleDto createRole(RoleDto roleDto) {
        Role role = new Role();
        role.setName(roleDto.getRole_name());
        Role newRole = roleRepository.save(role);
        roleDto.setId(newRole.getId());
        return roleDto;

    }
}
