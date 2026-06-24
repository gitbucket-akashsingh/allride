package com.example.allride.driver.exception;

import com.example.allride.common.constants.ErrorCode;
import com.example.allride.common.exception.BaseException;
import org.springframework.http.HttpStatus;

public class DriverProfileNotFoundException extends BaseException {

    public DriverProfileNotFoundException() {
        super("Driver profile not found. Please complete onboarding first.",
                ErrorCode.DRIVER_PROFILE_NOT_FOUND,
                HttpStatus.NOT_FOUND);
    }

}
