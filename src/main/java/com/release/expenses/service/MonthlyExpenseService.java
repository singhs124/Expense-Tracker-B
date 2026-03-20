package com.release.expenses.service;

import com.release.expenses.dto.ExpenseDTO;
import com.release.expenses.exception.ExpenseNotFoundException;
import com.release.expenses.model.Bank;
import com.release.expenses.model.Expense;
import com.release.expenses.model.User;
import com.release.expenses.repository.BankRepo;
import com.release.expenses.repository.ExpenseRepo;
import com.release.expenses.utils.AuthUserUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MonthlyExpenseService {

    private final ExpenseRepo expenseRepo;
    private final BankRepo bankRepo;
    private final AuthUserUtil authUserUtil;


    //ToDO: introduce response DTO for this, currently whole data (table+joined table) is exposed.
    public Expense addExpense(ExpenseDTO expenseDTO){
        Long userId = authUserUtil.getCurrentUser();
        Bank bank = bankRepo.findByNameAndUserId(expenseDTO.Bank() , userId);
        Expense newExpense = new Expense();
        newExpense.setAmount(expenseDTO.amount());
        newExpense.setDescription(expenseDTO.description());
        newExpense.setFixed(expenseDTO.fixed());
        newExpense.setBank(bank);
        newExpense.setUserId(userId);
        return expenseRepo.save(newExpense);
    }

    public List<Object[]> getExpenseByOrigin(){
        log.debug("Getting Expenses Grouped by Origin");
        Long userId = authUserUtil.getCurrentUser();
        List<Object[]> expenses =  expenseRepo.getExpenseGroupByBank(userId);
//        todo: Handle no expense conditions
//        if(expenses == null || expenses.isEmpty()){
//            throw new ExpenseNotFoundException("No Data Available to Show!");
//        }
        return expenses;
    }

    public List<Object[]> getExpenseByMonth(){
        log.debug("Getting Expenses Grouped by Month");
        Long userId = authUserUtil.getCurrentUser();
        List<Object[]> expenses =  expenseRepo.getExpenseGroupByMonth(userId);
        if(expenses == null || expenses.isEmpty()){
            throw new ExpenseNotFoundException("No Data Available to Show!");
        }
        return expenses;
    }

    public Double getTotalExpense(){
        log.debug("Getting Total Expense");
        Long userId = authUserUtil.getCurrentUser();
        Double amount = expenseRepo.getTotalExpense(userId);
        if(amount == null) return 0.0;
        return amount;
    }
}
