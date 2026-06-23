package com.example.allride.driver.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DriverStatusResponse {
    private Boolean online;
    private String message;
}
