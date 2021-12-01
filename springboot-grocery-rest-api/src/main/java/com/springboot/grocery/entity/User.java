package com.springboot.grocery.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor


@Entity
@Table(
        name = "user", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_name"})}
)
public class User {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String first_name;

    @Column(name = "last_name", nullable = false)
    private String last_name;

    @Column(name = "phone", nullable = true)
    private String phone;

    @Column(name = "user_name", nullable = false)
    private String user_name;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "address", nullable = true)
    private String address;

    @Column(name = "customer_rating", nullable = true)
    private String customer_rating;

    @Column(name = "credits", nullable = true)
    private double credits;


    @Column(name = "is_manager", nullable = false)
    private Boolean is_manager;

}