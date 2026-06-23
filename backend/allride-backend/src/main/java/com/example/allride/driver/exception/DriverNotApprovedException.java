package com.example.allride.driver.exception;

import com.example.allride.common.constants.ErrorCode;
import com.example.allride.common.exception.BaseException;
import org.springframework.http.HttpStatus;

public class DriverNotApprovedException extends BaseException {

    public DriverNotApprovedException() {
        super("Driver account is not approved yet",
                ErrorCode.DRIVER_NOT_APPROVED,
                HttpStatus.FORBIDDEN);
    }
}
