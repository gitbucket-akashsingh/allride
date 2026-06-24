package com.example.allride.ride.exception;

import com.example.allride.common.constants.ErrorCode;
import com.example.allride.common.exception.BaseException;
import org.springframework.http.HttpStatus;

public class RideInvalidStateException extends BaseException {

    public RideInvalidStateException(String message) {
        super(message, ErrorCode.RIDE_INVALID_STATE, HttpStatus.CONFLICT);
    }
}