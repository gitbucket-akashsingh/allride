package com.example.allride.ride.exception;

import com.example.allride.common.constants.ErrorCode;
import com.example.allride.common.exception.BaseException;
import org.springframework.http.HttpStatus;

public class RideNotAuthorizedException extends BaseException {

    public RideNotAuthorizedException() {
        super("Not authorized to access this ride",
                ErrorCode.RIDE_NOT_AUTHORIZED,
                HttpStatus.FORBIDDEN);
    }

    public RideNotAuthorizedException(String message) {
        super(message, ErrorCode.RIDE_NOT_AUTHORIZED, HttpStatus.FORBIDDEN);
    }
}