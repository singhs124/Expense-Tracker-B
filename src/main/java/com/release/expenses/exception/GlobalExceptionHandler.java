package com.release.expenses.exception;

import com.release.expenses.dto.ErrorMap;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMap> handleGeneralException(Exception ex){
        return new ResponseEntity<>(new ErrorMap(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(BankNotFoundException.class)
    public ResponseEntity<ErrorMap> handleBankNotFoundException(BankNotFoundException ex){
        return new ResponseEntity<>(new ErrorMap(ex.getMessage(),HttpStatus.NOT_FOUND),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ExpenseNotFoundException.class)
    public ResponseEntity<ErrorMap> handleExpenseNotFoundException(ExpenseNotFoundException ex){
        return new ResponseEntity<>(new ErrorMap(ex.getMessage(),HttpStatus.NOT_FOUND),HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(DuplicateBankNameException.class)
    public ResponseEntity<ErrorMap> handleDuplicateBankNameException(DuplicateBankNameException ex){
        return new ResponseEntity<>(new ErrorMap(ex.getMessage(),HttpStatus.METHOD_NOT_ALLOWED), HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorMap> handleAccessDeniedException(AccessDeniedException ex){
        return new ResponseEntity<>(new ErrorMap(ex.getMessage(),HttpStatus.FORBIDDEN),HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorMap> handleUserNotFoundException(UserNotFoundException ex){
        return new ResponseEntity<>(new ErrorMap(ex.getMessage(),HttpStatus.NOT_FOUND),HttpStatus.NOT_FOUND);
    }
}
