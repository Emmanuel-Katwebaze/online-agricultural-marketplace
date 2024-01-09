package com.emmakatwebaze.adminbackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "orders") // Specify a different table name (plural to avoid reserved keyword)
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Order {
    @Id
    @SequenceGenerator(
            name = "order_sequence",
            sequenceName = "order_sequence",
            allocationSize = 1

    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "order_sequence"
    )
    private Long orderId;

    private String orderDate;

    private Integer totalAmount;

    private String status;

    @ManyToOne(
            cascade = CascadeType.ALL,
//            fetch = FetchType.LAZY, was causing problems with the GET method
            optional = false
    )
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "userId"
    )
    private User user;

}
