package com.release.expenses.repository;

import com.release.expenses.dto.BankResponseDTO;
import com.release.expenses.model.Bank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankRepo extends JpaRepository<Bank,Long> {
    Bank findByNameAndUserId(String name, Long userId);
    boolean existsByNameIgnoreCaseAndUserId(String name, Long userid);

    @Query("select new com.release.expenses.dto.BankResponseDTO(b.id,b.name) from Bank b where b.userId = :userid")
    List<BankResponseDTO> findAllBanks(@Param("userid") Long userid);
}
