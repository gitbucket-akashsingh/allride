package com.example.allride.driver.exception;

import com.example.allride.common.constants.ErrorCode;
import com.example.allride.common.exception.BaseException;
import org.springframework.http.HttpStatus;

public class DriverUnavailableException extends BaseException {

    public DriverUnavailableException(String message) {
        super(message, ErrorCode.DRIVER_UNAVAILABLE, HttpStatus.BAD_REQUEST);
    }
}
