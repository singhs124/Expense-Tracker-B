package com.release.expenses.service;

import com.release.expenses.dto.BankDTO;
import com.release.expenses.dto.BankResponseDTO;
import com.release.expenses.exception.BankNotFoundException;
import com.release.expenses.exception.DuplicateBankNameException;
import com.release.expenses.model.Bank;
import com.release.expenses.model.User;
import com.release.expenses.repository.BankRepo;
import com.release.expenses.utils.AuthUserUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BankProfileService {

    private final BankRepo bankRepo;
    private final AuthUserUtil authUserUtil;

    public Bank addBank(BankDTO name) {
        Long userId = authUserUtil.getCurrentUser();
        if(bankRepo.existsByNameIgnoreCaseAndUserId(name.bankName().toLowerCase(),userId)){
            throw new DuplicateBankNameException("Bank Already Exists");
        }
        Bank bank = new Bank();
        bank.setName(name.bankName());
        bank.setUserId(userId);
        System.out.println(bank);
        return bankRepo.save(bank);
    }

    public List<BankResponseDTO> getBanks(){
        Long userId = authUserUtil.getCurrentUser();
        List<BankResponseDTO> banks = bankRepo.findAllBanks(userId);
        if(banks.isEmpty()){
            throw new BankNotFoundException("No Bank Found. Please add Bank");
        }
        return banks;
    }

    public void deleteBank(Long bankId) {
        log.debug("Deleting bank with id {} ", bankId);
        bankRepo.deleteById(bankId);
    }

    public BankResponseDTO updateBank(Long bankId, BankDTO patchBank) {
        Bank bank = bankRepo.findById(bankId)
                .orElseThrow(()->new BankNotFoundException("Bank doesn't exists!"));
        if(patchBank.bankName() == null || patchBank.bankName().equals(bank.getName())){
            throw new DuplicateBankNameException("Bank Name is Same as Existing!");
        }
        bank.setName(patchBank.bankName());
        Bank updatedBank = bankRepo.save(bank);
        return new BankResponseDTO(updatedBank.getId(), updatedBank.getName());
    }
}
