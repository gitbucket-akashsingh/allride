package com.example.allride.ride.exception;

import com.example.allride.common.constants.ErrorCode;
import com.example.allride.common.exception.BaseException;
import org.springframework.http.HttpStatus;

public class RideAlreadyCancelledException extends BaseException {

    public RideAlreadyCancelledException() {
        super("Ride has already been cancelled",
                ErrorCode.RIDE_ALREADY_CANCELLED,
                HttpStatus.CONFLICT);
    }
}