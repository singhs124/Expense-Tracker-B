package com.release.expenses.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NotFound;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="su_origin", indexes = {
        @Index(name = "idx_user_id_origin", columnList = "user_id")
})
public class Bank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name" , unique = true)
    private String name;
    //ToDO: Joining table over userId
    @Column(name = "user_id")
    private Long userId;

    @OneToMany(mappedBy = "bank" , fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Expense> expense;
}
