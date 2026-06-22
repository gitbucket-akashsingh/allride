package com.example.allride.auth.authentication.exception;

import com.example.allride.common.constants.ErrorCode;
import com.example.allride.common.exception.BaseException;
import org.springframework.http.HttpStatus;

public class EmailAlreadyExistsException extends BaseException {

    public EmailAlreadyExistsException() {
        super("Email already exists",
                ErrorCode.EMAIL_ALREADY_EXISTS,
                HttpStatus.CONFLICT);
    }
}
