package com.release.expenses.service;

import com.release.expenses.auth.Exception.InvalidIdentifierException;
import com.release.expenses.auth.Exception.InvalidOTPException;
import com.release.expenses.utils.AuthUtil;
import com.release.expenses.config.SHAHashing;
import com.release.expenses.dto.AuthTokenResDTO;
import com.release.expenses.dto.AuthReqDTO;
import com.release.expenses.model.UserOtp;
import com.release.expenses.repository.AuthRepo;
import com.release.expenses.utils.EncryptionUtil;
import com.release.expenses.exception.UserNotFoundException;
import com.release.expenses.model.User;
import com.release.expenses.utils.OTPGenerator;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;

@Slf4j
@Service
@RequiredArgsConstructor
public class MobileAuthService {

    private final AuthUtil authUtil;
    private final AuthRepo authRepo;
    private final UserService userService;

    //TODO: Adding more validation for mobile Number
    private boolean validateMobileNumber(String mobileNumber){
        if(mobileNumber.length() != 10) return false;
        return true;
    }

    //Todo: Use-case of adding mobile number with country code in DB
    public String generateOtp(AuthReqDTO mobileObj) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        if(!validateMobileNumber(mobileObj.mobileNumber())){
            throw new InvalidIdentifierException("Invalid Mobile Number !");
        }
        String salt = SHAHashing.generateSalt(16);
        String EncryptedMobileNumberWithCountryCode = EncryptionUtil.encrypt(mobileObj.reqObject()+mobileObj.mobileNumber());
        UserOtp checkIfUserExistAlready  = authRepo.findByPhoneHash(EncryptedMobileNumberWithCountryCode);
        if(checkIfUserExistAlready != null){
            log.debug("User ReAttempted to generate OTP");
            String otp = SHAHashing.generateSHA256Hash(OTPGenerator.generateOtp()+salt);
            checkIfUserExistAlready.setSalt(salt);
            checkIfUserExistAlready.setOtpHash(otp);
            authRepo.save(checkIfUserExistAlready);
            return otp;
        }
        String otp = SHAHashing.generateSHA256Hash(OTPGenerator.generateOtp()+salt);
        UserOtp userOtp = new UserOtp();
        userOtp.setPhoneHash(EncryptedMobileNumberWithCountryCode);
        userOtp.setOtpHash(otp);
        userOtp.setSalt(salt);
        authRepo.save(userOtp);
        return otp;
    }

    public AuthTokenResDTO validateOtp(AuthReqDTO otpObj) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        String EncryptMobileNumber = EncryptionUtil.encrypt(otpObj.mobileNumber());
        log.debug("EncryptMobileNumber: {}" , EncryptMobileNumber);
        UserOtp record = authRepo.findByPhoneHash(EncryptMobileNumber);
        if(record == null){
            throw new InvalidOTPException("OTP not Generated, Try Again!");
        }
        String salt = record.getSalt();
        String otpWithSalt = otpObj.reqObject() + salt;
        String HashedOtp = SHAHashing.generateSHA256Hash(otpWithSalt);
        log.debug("HashedOtp: {}", HashedOtp);
        if(!HashedOtp.equals(record.getOtpHash())){
            throw new InvalidOTPException("Incorrect OTP!");
        }
        //Create or Check for this mobile in Users Table
        User user = userService.createUser(EncryptMobileNumber);
        return generateTokenWithLogin(user);
    }

    private AuthTokenResDTO generateTokenWithLogin(User user){
        String access = authUtil.generateAccessToken(user.getId().toString());
        String refresh = authUtil.generateRefreshToken(user.getId().toString());
        userService.updateUser(user.getId(),refresh);
        Instant instant = Instant.now();
        return new AuthTokenResDTO(access,refresh,instant.toEpochMilli());
    }

    public AuthTokenResDTO generateTokenWithRefreshToken(String refreshToken) {
        String userIdFromToken = authUtil.parseToken(refreshToken);
        User user = userService.findUserById(Long.valueOf(userIdFromToken)).orElseThrow(()->new UserNotFoundException("User not Found!"));
        if(user.getRefreshToken() == null || !user.getRefreshToken().equals(refreshToken)){
            throw new MalformedJwtException("Wrong Token!");
        }
        String access = authUtil.generateAccessToken(userIdFromToken);
        String refresh = authUtil.generateRefreshToken(userIdFromToken);
        userService.updateUser(user.getId(), refresh);
        Instant instant = Instant.now();
        return new AuthTokenResDTO(access,refresh, instant.toEpochMilli());
    }
}
