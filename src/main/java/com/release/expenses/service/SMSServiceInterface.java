package com.release.expenses.service;

public interface SMSServiceInterface {
    String sendSMS(String mobileNumber, String otp);
}
