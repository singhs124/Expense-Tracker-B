package com.release.expenses.utils;

import com.release.expenses.exception.UserNotFoundException;
import com.release.expenses.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AuthUserUtil {

    public Long getCurrentUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth == null || !auth.isAuthenticated() || auth.getPrincipal() == null){
            throw new UserNotFoundException("Please Login First!");
        }
        String userIdString = (String) auth.getPrincipal();
        Long userId = Long.valueOf(userIdString);
        log.debug("Authenticated User: {}", userId);
        return userId;
    }
}
