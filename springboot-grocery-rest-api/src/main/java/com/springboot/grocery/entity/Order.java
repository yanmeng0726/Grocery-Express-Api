package com.springboot.grocery.entity;


import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Getter
@Setter
@Entity
@Table(
        name = "`order`"
)
public class Order {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    private Long user_id;
    private Long drone_id;
    private Long employee_id;
    private double total_cost;
    private double total_weight;
    private int order_status;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;
}
