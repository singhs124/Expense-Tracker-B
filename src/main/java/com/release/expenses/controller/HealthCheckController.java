package com.release.expenses.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/health")
@RestController
public class HealthCheckController {
    @GetMapping("/")
    public ResponseEntity<String> getHealth(){
        return new ResponseEntity<>("Ok", HttpStatusCode.valueOf(200));
    }
}
