package com.release.expenses.repository;

import com.release.expenses.model.UserOtp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepo extends JpaRepository<UserOtp,Long> {
    UserOtp findByUserIdentifier(String userIdentifier);
}
