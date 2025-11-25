package com.release.expenses.dto;

public record AuthTokenResDTO(String access_token, String refresh_token, long created_at) {
}
