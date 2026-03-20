package com.release.expenses.controller;


import com.release.expenses.dto.UserResponseDTO;
import com.release.expenses.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/v1/user/")
public class UserController {
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<UserResponseDTO> getUserDetails() throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        return new ResponseEntity<>(userService.getUserDetails() , HttpStatus.OK);
    }

}
