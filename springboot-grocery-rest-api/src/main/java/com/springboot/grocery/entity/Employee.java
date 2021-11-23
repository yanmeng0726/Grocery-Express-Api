package com.springboot.grocery.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor


@Entity
@Table(/*Question*/
        name = "employee", uniqueConstraints = {@UniqueConstraint(columnNames = {"license_id"})}
)
public class Employee {

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

    @Column(name = "ssn", nullable = false)
    private String ssn;

    @Column(name = "license_id", nullable = false)
    private String license_id;

    @Column(name = "experience", nullable = false)
    private int experience;

    @Column(name = "expiration_date", nullable = false)
    private String expiration_date;


    @Column(name = "is_free", nullable = false)
    private Boolean is_free;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

}