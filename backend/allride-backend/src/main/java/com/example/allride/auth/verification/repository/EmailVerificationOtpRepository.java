package com.example.allride.auth.verification.repository;

import com.example.allride.auth.authentication.entity.User;
import com.example.allride.auth.verification.entity.EmailVerificationOtp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface EmailVerificationOtpRepository extends JpaRepository<EmailVerificationOtp, Long> {

    Optional<EmailVerificationOtp> findTopByUserAndUsedFalseOrderByCreatedAtDesc(User user);

    long countByUserAndCreatedAtAfter(User user, LocalDateTime since);
}