package com.springboot.grocery.controller;

import com.springboot.grocery.entity.Role;
import com.springboot.grocery.entity.User;
import com.springboot.grocery.payload.JWTAuthResponse;
import com.springboot.grocery.payload.LoginDto;
import com.springboot.grocery.payload.SignUpDto;
import com.springboot.grocery.repository.RoleRepository;
import com.springboot.grocery.repository.UserRepository;
import com.springboot.grocery.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<JWTAuthResponse> authenticateUser(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetail = (UserDetails) auth.getPrincipal();
        String userName = userDetail.getUsername();
        User user = userRepository.findUser(userName).orElseThrow(() ->
                new UsernameNotFoundException("User not found with username or email:" + userName));;

//         get token form tokenProvider
        String token = tokenProvider.generateToken(authentication);
        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse(token, user.getId());
        jwtAuthResponse.setUser_id(user.getId());
        jwtAuthResponse.setAddress(user.getAddress());
        jwtAuthResponse.setCustomer_rating(user.getCustomer_rating());
        jwtAuthResponse.setEmail(user.getEmail());
        jwtAuthResponse.setIs_manager(user.getIs_manager());
        jwtAuthResponse.setName(user.getName());
        jwtAuthResponse.setPhone(user.getPhone());
        jwtAuthResponse.setUsername(user.getUsername());
        jwtAuthResponse.setCredits(user.getCredits());
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpDto signUpDto){

        // add check for username exists in a DB
        if(userRepository.existsByUsername(signUpDto.getUsername())){
            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
        }

        // add check for email exists in DB
        if(userRepository.existsByEmail(signUpDto.getEmail())){
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }

        // create user object
        User user = new User();
        user.setName(signUpDto.getName());
        user.setUsername(signUpDto.getUsername());
        user.setEmail(signUpDto.getEmail());
        user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));
        user.setPhone(signUpDto.getPhone());
        user.setAddress(signUpDto.getAddress());
        user.setCustomer_rating(signUpDto.getCustomer_rating());
        user.setCredits(signUpDto.getCredits());
        user.setIs_manager(signUpDto.getIs_manager());
        if(signUpDto.getIs_manager() == true){
            Role roles = roleRepository.findByName("ROLE_MANAGER").get();
            user.setRoles(Collections.singleton(roles));
        }else{
            Role roles = roleRepository.findByName("ROLE_CUSTOMER").get();
            user.setRoles(Collections.singleton(roles));
        }

        userRepository.save(user);

        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);

    }
}

