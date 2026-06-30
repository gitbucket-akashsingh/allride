package com.example.allride.auth.verification.controller;

import com.example.allride.auth.verification.dto.request.ResendOtpRequest;
import com.example.allride.auth.verification.dto.request.VerifyEmailRequest;
import com.example.allride.auth.verification.dto.response.VerifyEmailResponse;
import com.example.allride.auth.verification.service.EmailVerificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Email Verification", description = "OTP email verification")
public class EmailVerificationController {

    private final EmailVerificationService emailVerificationService;

    @Operation(summary = "Verify email with OTP")
    @PostMapping("/verify-email")
    public ResponseEntity<VerifyEmailResponse> verifyEmail(
            @Valid @RequestBody VerifyEmailRequest request) {

        emailVerificationService.verifyOtp(request.getEmail(), request.getOtp());

        return ResponseEntity.ok(VerifyEmailResponse.builder()
                .message("Email verified successfully. You can now log in.")
                .email(EmailVerificationService.normalizeEmail(request.getEmail()))
                .build());
    }

    @Operation(summary = "Resend verification OTP")
    @PostMapping("/resend-otp")
    public ResponseEntity<VerifyEmailResponse> resendOtp(
            @Valid @RequestBody ResendOtpRequest request) {

        emailVerificationService.resendOtp(request.getEmail());

        return ResponseEntity.ok(VerifyEmailResponse.builder()
                .message("If your account exists and is unverified, a new code has been sent.")
                .email(EmailVerificationService.normalizeEmail(request.getEmail()))
                .build());
    }
}