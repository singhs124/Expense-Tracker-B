package com.release.expenses.controller;

import com.release.expenses.dto.AuthTokenResDTO;
import com.release.expenses.model.User;
import com.release.expenses.repository.UserRepo;
import com.release.expenses.utils.AuthUtil;
import com.release.expenses.utils.EncryptionUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;

@RequestMapping("/api/v1/health/")
@RestController
@RequiredArgsConstructor
public class HealthCheckController {
//    todo: Refactor this as per standards {shifting to service layer}
    private final UserRepo userRepo;
    private final AuthUtil authUtil;

    @GetMapping("")
    public ResponseEntity<String> getHealth(){
        return new ResponseEntity<>("Ok", HttpStatusCode.valueOf(200));
    }

    @GetMapping("token")
    public ResponseEntity<AuthTokenResDTO> getToken(@RequestParam(name = "m_user") String userIdentifier) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        String encryptedUserIdentifier = EncryptionUtil.encrypt(userIdentifier);
        User user = userRepo.findByUserIdentity(encryptedUserIdentifier);
        if(user == null) return new ResponseEntity<>(null, HttpStatusCode.valueOf(404));
        String access = authUtil.generateAccessToken(user.getId().toString());
        String refresh = authUtil.generateRefreshToken(user.getId().toString());
        Instant instant = Instant.now();
        return new ResponseEntity<>(new AuthTokenResDTO(access,refresh,instant.toEpochMilli()), HttpStatusCode.valueOf(200));
    }
}
