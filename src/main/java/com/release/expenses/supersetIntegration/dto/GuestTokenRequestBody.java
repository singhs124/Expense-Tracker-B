package com.release.expenses.supersetIntegration.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Data
public class GuestTokenRequestBody {
    private final List<Map<String, Object>> resources;
    private final Map<String,Object> user;
    private final List<Map<String,Object>> rls;
}
