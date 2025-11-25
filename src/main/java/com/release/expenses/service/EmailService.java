package com.release.expenses.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailService {
    private final JavaMailSender javaMailSender;

    @Value("${mail.sender.name}")
    private String senderName;

    @Value("${mail.sender.email}")
    private String senderEmail;

    public void sendOtp(String to, String otp) throws MessagingException, UnsupportedEncodingException {
        log.debug("Sending Auth to {} : {}", to, otp);
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);
        helper.setFrom(senderEmail,senderName);
        helper.setTo(to);
        helper.setSubject("Authentication Info");
        helper.setText("Your OTP is "+ otp + ". It is valid for 5 minutes.");
        javaMailSender.send(message);
        log.debug("Email Sent!");
    }
}
