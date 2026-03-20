package com.release.expenses.controller;


import com.release.expenses.dto.ExpenseDTO;
import com.release.expenses.model.Expense;
import com.release.expenses.service.MonthlyExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/expense/")
public class MonthlyExpenseController {

    private final MonthlyExpenseService monthlyExpenseService;

    public MonthlyExpenseController(MonthlyExpenseService monthlyExpenseService){
        this.monthlyExpenseService = monthlyExpenseService;
    }

    @PostMapping()
    public Expense addExpense(@RequestBody ExpenseDTO expenseDTO){
        System.out.println(expenseDTO.Bank());
        return monthlyExpenseService.addExpense(expenseDTO);
    }

    @GetMapping("getByOrigin")
    public List<Object[]> getExpenseByOrigin(){
        return monthlyExpenseService.getExpenseByOrigin();
    }

    @GetMapping("getByMonth")
    public List<Object[]> getExpenseByMonth(){
        return monthlyExpenseService.getExpenseByMonth();
    }

    @GetMapping("totalExpense")
    public Double getTotalExpenses(){
        return monthlyExpenseService.getTotalExpense();
    }
}
