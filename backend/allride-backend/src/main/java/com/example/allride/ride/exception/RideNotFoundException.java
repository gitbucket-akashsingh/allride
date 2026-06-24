package com.example.allride.ride.exception;

import com.example.allride.common.constants.ErrorCode;
import com.example.allride.common.exception.BaseException;
import org.springframework.http.HttpStatus;

public class RideNotFoundException extends BaseException {

    public RideNotFoundException() {
        super("Ride not found", ErrorCode.RIDE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    public RideNotFoundException(String message) {
        super(message, ErrorCode.RIDE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
}