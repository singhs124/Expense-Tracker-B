package com.release.expenses.auth.Exception;

public class InvalidIdentifierException extends RuntimeException {
    public InvalidIdentifierException(String message) {
        super(message);
    }
}
