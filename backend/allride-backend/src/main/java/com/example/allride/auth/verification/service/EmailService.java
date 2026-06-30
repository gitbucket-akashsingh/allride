package com.example.allride.auth.verification.service;

import com.example.allride.auth.verification.config.EmailProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final EmailProperties emailProperties;

    @Async
    public void sendVerificationOtp(String toEmail, String otp, int expiryMinutes) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(emailProperties.getFrom());
            helper.setTo(toEmail);
            helper.setSubject("Your AllRide verification code");
            helper.setText(buildHtml(otp, expiryMinutes), true);

            mailSender.send(message);
            log.info("Verification OTP email queued for {}", maskEmail(toEmail));
        } catch (MessagingException ex) {
            log.error("Failed to send OTP email to {}", maskEmail(toEmail), ex);
            throw new IllegalStateException("Unable to send verification email");
        }
    }

    private String buildHtml(String otp, int expiryMinutes) {
        return """
                <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;">
                  <h2>Verify your AllRide account</h2>
                  <p>Your one-time verification code is:</p>
                  <p style="font-size:32px;font-weight:bold;letter-spacing:8px;">%s</p>
                  <p>This code expires in %d minutes. Do not share it with anyone.</p>
                  <p style="color:#666;font-size:12px;">If you did not create an AllRide account, ignore this email.</p>
                </div>
                """.formatted(otp, expiryMinutes);
    }

    private String maskEmail(String email) {
        int at = email.indexOf('@');
        if (at <= 1) return "***";
        return email.charAt(0) + "***" + email.substring(at);
    }
}