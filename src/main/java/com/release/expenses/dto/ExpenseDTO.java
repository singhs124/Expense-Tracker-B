package com.release.expenses.dto;


public record ExpenseDTO(
        String Bank,
        Double amount,
        String description,
        Integer fixed
) {

}
