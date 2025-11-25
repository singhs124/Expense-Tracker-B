package com.release.expenses.controller;

import com.release.expenses.dto.AuthReqDTO;
import com.release.expenses.dto.AuthTokenResDTO;
import com.release.expenses.service.MobileAuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

/*
AuthReqDTO
During Login
        mobileNumber : mobile number
        reqObject: country code
During OTP validation
        mobileNumber: mobile number
        reqObject: otp
*/

@RestController
@RequestMapping("/api/v1/auth/")
public class MobileAuthController {

    MobileAuthService mobileAuthService;

    public MobileAuthController(MobileAuthService mobileAuthService){
        this.mobileAuthService = mobileAuthService;
    }


    //Todo: Restrict the calling of this api from same mobile number multiple times in a row.
    @PostMapping("")
    public ResponseEntity<String> sendOTP(@RequestBody AuthReqDTO mobileObj) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        String otp = mobileAuthService.generateOtp(mobileObj);
        return new ResponseEntity<>(otp, HttpStatus.OK);
    }

    @PostMapping("/validateOtp")
    public ResponseEntity<AuthTokenResDTO> validateAndGenerateToken(@RequestBody AuthReqDTO mobileObj) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        AuthTokenResDTO token = mobileAuthService.validateOtp(mobileObj);
        return new ResponseEntity<>(token,HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthTokenResDTO> generateTokenWithRefreshToken(@RequestParam(name= "refresh_token") String refresh){
        AuthTokenResDTO token = mobileAuthService.generateTokenWithRefreshToken(refresh);
        return new ResponseEntity<>(token,HttpStatus.OK);
    }
}
