package com.release.expenses.exception;

public class DuplicateBankNameException extends RuntimeException {
    public DuplicateBankNameException(String message) {
        super(message);
    }
}
