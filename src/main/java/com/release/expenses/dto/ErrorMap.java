package com.release.expenses.dto;

import org.springframework.http.HttpStatus;

public record ErrorMap(String message, HttpStatus statusCode) {
}
