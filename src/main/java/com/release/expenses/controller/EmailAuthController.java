package com.release.expenses.controller;


import com.release.expenses.dto.AuthTokenResDTO;
import com.release.expenses.dto.AuthReqDTO;
import com.release.expenses.service.EmailAuthService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

/*
AuthReqDTO
During Login
        mobileNumber : email
        reqObject: null
During OTP validation
        mobileNumber: email
        reqObject: otp
*/


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth/email")
public class EmailAuthController {

    private final EmailAuthService emailAuthService;

    @PostMapping("")
    public ResponseEntity<String> sendOTP(@RequestBody AuthReqDTO authObj) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException, MessagingException, UnsupportedEncodingException {
        String otp = emailAuthService.generateOtp(authObj);
        return new ResponseEntity<>(otp, HttpStatus.OK);
    }

    @PostMapping("/validateOtp")
    public ResponseEntity<AuthTokenResDTO> validateAndGenerateToken(@RequestBody AuthReqDTO authObj) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        AuthTokenResDTO token = emailAuthService.validateOtp(authObj);
        return new ResponseEntity<>(token,HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthTokenResDTO> generateTokenWithRefreshToken(@RequestParam(name= "refresh_token") String refresh){
        AuthTokenResDTO token = emailAuthService.generateTokenWithRefreshToken(refresh);
        return new ResponseEntity<>(token,HttpStatus.OK);
    }
}

