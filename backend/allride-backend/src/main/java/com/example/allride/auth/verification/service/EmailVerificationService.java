package com.example.allride.auth.verification.service;

import com.example.allride.auth.authentication.entity.User;
import com.example.allride.auth.authentication.repository.UserRepository;
import com.example.allride.auth.verification.config.OtpProperties;
import com.example.allride.auth.verification.entity.EmailVerificationOtp;
import com.example.allride.auth.verification.exception.OtpVerificationException;
import com.example.allride.auth.verification.repository.EmailVerificationOtpRepository;
import com.example.allride.common.constants.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    private final EmailVerificationOtpRepository otpRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final OtpProperties otpProperties;

    /**
     * Called after signup and on resend
     */
    @Transactional
    public void issueAndSendOtp(User user) {
        enforceResendLimits(user);

        String rawOtp = generateOtp();
        LocalDateTime now = LocalDateTime.now();

        EmailVerificationOtp record = EmailVerificationOtp.builder()
                .user(user)
                .otpHash(passwordEncoder.encode(rawOtp))
                .expiresAt(now.plusMinutes(otpProperties.getExpiryMinutes()))
                .attemptCount(0)
                .used(false)
                .createdAt(now)
                .build();

        otpRepository.save(record);
        emailService.sendVerificationOtp(user.getEmail(), rawOtp, otpProperties.getExpiryMinutes());
    }

    /**
     * Verify OTP entered by user
     */
    @Transactional
    public void verifyOtp(String email, String otp) {
        String normalizedEmail = normalizeEmail(email);
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> genericInvalidOtp());

        if (user.isEmailVerified()) {
            return; // idempotent — already verified
        }

        EmailVerificationOtp record = otpRepository
                .findTopByUserAndUsedFalseOrderByCreatedAtDesc(user)
                .orElseThrow(() -> genericInvalidOtp());

        if (record.isUsed()) {
            throw genericInvalidOtp();
        }

        if (record.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new OtpVerificationException(
                    "Verification code has expired. Request a new one.",
                    ErrorCode.OTP_EXPIRED,
                    HttpStatus.BAD_REQUEST);
        }

        if (record.getAttemptCount() >= otpProperties.getMaxAttempts()) {
            throw new OtpVerificationException(
                    "Too many failed attempts. Request a new code.",
                    ErrorCode.OTP_MAX_ATTEMPTS_EXCEEDED,
                    HttpStatus.TOO_MANY_REQUESTS);
        }

        record.setAttemptCount(record.getAttemptCount() + 1);

        if (!passwordEncoder.matches(otp.trim(), record.getOtpHash())) {
            otpRepository.save(record);
            throw genericInvalidOtp();
        }

        record.setUsed(true);
        user.setEmailVerified(true);
        user.setEmailVerifiedAt(LocalDateTime.now());

        otpRepository.save(record);
        userRepository.save(user);
    }

    @Transactional
    public void resendOtp(String email) {
        String normalizedEmail = normalizeEmail(email);
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> genericInvalidOtp()); // don't reveal if email exists

        if (user.isEmailVerified()) {
            return; // silent success — prevents email enumeration
        }

        issueAndSendOtp(user);
    }

    private void enforceResendLimits(User user) {
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        long sentLastHour = otpRepository.countByUserAndCreatedAtAfter(user, oneHourAgo);

        if (sentLastHour >= otpProperties.getMaxResendsPerHour()) {
            throw new OtpVerificationException(
                    "Too many verification requests. Try again later.",
                    ErrorCode.OTP_RESEND_LIMIT_EXCEEDED,
                    HttpStatus.TOO_MANY_REQUESTS);
        }

        otpRepository.findTopByUserAndUsedFalseOrderByCreatedAtDesc(user)
                .ifPresent(latest -> {
                    LocalDateTime cooldownEnd = latest.getCreatedAt()
                            .plusSeconds(otpProperties.getResendCooldownSeconds());
                    if (cooldownEnd.isAfter(LocalDateTime.now())) {
                        throw new OtpVerificationException(
                                "Please wait before requesting another code.",
                                ErrorCode.OTP_RESEND_TOO_SOON,
                                HttpStatus.TOO_MANY_REQUESTS);
                    }
                });
    }

    private String generateOtp() {
        int code = 100_000 + SECURE_RANDOM.nextInt(900_000);
        return String.valueOf(code);
    }

    public static String normalizeEmail(String email) {
        return email == null ? "" : email.trim().toLowerCase();
    }

    private OtpVerificationException genericInvalidOtp() {
        return new OtpVerificationException(
                "Invalid verification code.",
                ErrorCode.OTP_INVALID,
                HttpStatus.BAD_REQUEST);
    }
}