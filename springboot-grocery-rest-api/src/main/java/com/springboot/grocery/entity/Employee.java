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
        name = "employee", uniqueConstraints = {@UniqueConstraint(columnNames = {"license_id"})}
)
public class Employee {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    private String first_name;

    private String last_name;

    private String phone;

    private String ssn;

    private String license_id;

    private int experience;

    private String expiration_date;

    private Boolean is_free;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

}