package com.example.allride.auth.authentication.exception;

import com.example.allride.common.constants.ErrorCode;
import com.example.allride.common.exception.BaseException;
import org.springframework.http.HttpStatus;

public class InvalidSignupRoleException extends BaseException {
    public InvalidSignupRoleException(String message) {
        super(message, ErrorCode.AUTH_INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
    }
}
