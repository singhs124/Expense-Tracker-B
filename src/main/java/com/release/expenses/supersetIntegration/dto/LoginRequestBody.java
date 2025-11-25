package com.release.expenses.supersetIntegration.dto;

import lombok.Data;

@Data
public class LoginRequestBody {
    private final String username;
    private final String password;
    private final Boolean refresh;
    private final String provider;
}
