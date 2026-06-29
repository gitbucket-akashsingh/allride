package com.example.allride.auth.authentication.exception;

import com.example.allride.common.constants.ErrorCode;
import com.example.allride.common.exception.BaseException;
import org.springframework.http.HttpStatus;

public class EmailNotVerifiedException extends BaseException {
    public EmailNotVerifiedException() {
        super("Email not verified. Please verify your email before logging in.",
                ErrorCode.EMAIL_NOT_VERIFIED,
                HttpStatus.FORBIDDEN);
    }
}