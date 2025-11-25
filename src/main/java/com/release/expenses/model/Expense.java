package com.release.expenses.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="su_expenses" , indexes = {
        @Index(name = "idx_user_id", columnList = "user_id")
})
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    private Double amount;
    private String description;
    private Integer fixed;
    //ToDO: Joining table over userId
    @Column(name = "user_id")
    private Long userId;

    @CreationTimestamp
    @Column(name="created_at" , nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="origin_id", referencedColumnName = "id")
    private Bank bank;
}
