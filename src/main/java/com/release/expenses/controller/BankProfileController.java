package com.release.expenses.controller;

import com.release.expenses.dto.BankDTO;
import com.release.expenses.dto.BankResponseDTO;
import com.release.expenses.model.Bank;
import com.release.expenses.service.BankProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bank/")
public class BankProfileController {
    private final BankProfileService bankProfileService;

    public BankProfileController(BankProfileService bankProfileService){
        this.bankProfileService = bankProfileService;
    }

    @PostMapping()
    public ResponseEntity<Bank> addNewBank(@RequestBody BankDTO name){
        Bank newBank =  bankProfileService.addBank(name);
        return new ResponseEntity<>(newBank,HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<BankResponseDTO>> getBanksList(){
        List<BankResponseDTO> result = bankProfileService.getBanks();
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @DeleteMapping("{bankId}")
    public ResponseEntity<String> deleteBank(@PathVariable Long bankId){
        bankProfileService.deleteBank(bankId);
        return new ResponseEntity<>("Bank Deleted!" , HttpStatus.OK);
    }

    @PatchMapping("{bankId}")
    public ResponseEntity<BankResponseDTO> updateBank(@RequestBody BankDTO bank, @PathVariable Long bankId){
        BankResponseDTO updatedBank = bankProfileService.updateBank(bankId,bank);
        return new ResponseEntity<>(updatedBank,HttpStatus.OK);
    }
}
