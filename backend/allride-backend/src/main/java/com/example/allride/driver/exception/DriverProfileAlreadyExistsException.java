package com.example.allride.driver.exception;

import com.example.allride.common.constants.ErrorCode;
import com.example.allride.common.exception.BaseException;
import org.springframework.http.HttpStatus;

public class DriverProfileAlreadyExistsException extends BaseException {
    
    public DriverProfileAlreadyExistsException() {
        super("Driver profile already exists",
                ErrorCode.DRIVER_PROFILE_ALREADY_EXISTS,
                HttpStatus.CONFLICT);
    }

}
