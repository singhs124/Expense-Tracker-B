package com.release.expenses.repository;

import com.release.expenses.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {

    boolean existsByPhoneHash(String phoneHash);

    User findByPhoneHash(String phoneHash);

    Optional<User> findById(Long id);
}
