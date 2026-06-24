package com.example.allride.driver.exception;

import com.example.allride.common.constants.ErrorCode;
import com.example.allride.common.exception.BaseException;
import org.springframework.http.HttpStatus;

public class DriverOfflineException extends BaseException {

    public DriverOfflineException() {
        super("Driver is offline. Go online to update location.",
                ErrorCode.DRIVER_OFFLINE,
                HttpStatus.BAD_REQUEST);
    }
}
