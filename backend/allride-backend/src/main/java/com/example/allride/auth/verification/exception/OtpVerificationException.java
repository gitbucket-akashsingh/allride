package com.example.allride.auth.verification.exception;

import com.example.allride.common.constants.ErrorCode;
import com.example.allride.common.exception.BaseException;
import org.springframework.http.HttpStatus;

public class OtpVerificationException extends BaseException {
    public OtpVerificationException(String message, ErrorCode code, HttpStatus status) {
        super(message, code, status);
    }
}