package com.release.expenses.supersetIntegration.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private final String accessToken;
    private final String sessionCookie;
}
