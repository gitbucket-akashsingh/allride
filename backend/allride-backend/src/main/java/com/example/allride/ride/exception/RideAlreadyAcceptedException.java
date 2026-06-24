package com.example.allride.ride.exception;

import com.example.allride.common.constants.ErrorCode;
import com.example.allride.common.exception.BaseException;
import org.springframework.http.HttpStatus;

public class RideAlreadyAcceptedException extends BaseException {

    public RideAlreadyAcceptedException() {
        super("Ride has already been accepted",
                ErrorCode.RIDE_ALREADY_ACCEPTED,
                HttpStatus.CONFLICT);
    }
}