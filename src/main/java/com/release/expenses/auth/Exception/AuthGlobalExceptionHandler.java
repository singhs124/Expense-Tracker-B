package com.release.expenses.auth.Exception;


import com.release.expenses.dto.ErrorMap;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AuthGlobalExceptionHandler {

    @ExceptionHandler(InvalidIdentifierException.class)
    public ResponseEntity<ErrorMap> handleIncorrectMobileNumber(InvalidIdentifierException ex){
        return new ResponseEntity<>(new ErrorMap(ex.getMessage(),HttpStatus.FORBIDDEN),HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(InvalidOTPException.class)
    public ResponseEntity<ErrorMap> handleInvalidOtp(InvalidOTPException ex){
        return new ResponseEntity<>(new ErrorMap(ex.getMessage(),HttpStatus.FORBIDDEN),HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorMap> handleJwtException(JwtException ex){
        return new ResponseEntity<>(new ErrorMap(ex.getMessage(),HttpStatus.UNAUTHORIZED),HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorMap> handleUsernameNotFoundException(UsernameNotFoundException ex){
        return new ResponseEntity<>(new ErrorMap(ex.getMessage(),HttpStatus.NOT_FOUND),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorMap> handleAuthException(AuthenticationException ex){
        return new ResponseEntity<>(new ErrorMap(ex.getMessage(),HttpStatus.UNAUTHORIZED),HttpStatus.UNAUTHORIZED);
    }
}
