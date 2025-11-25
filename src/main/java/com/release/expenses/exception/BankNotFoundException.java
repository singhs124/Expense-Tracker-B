package com.release.expenses.exception;

public class BankNotFoundException extends RuntimeException{
    public BankNotFoundException(String message){
        super(message);
    }
}
