package com.example.allride.driver.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateDriverProfileRequest {
    @NotBlank(message = "License number is required")
    private String licenseNumber;
    @NotBlank(message = "Vehicle make is required")
    private String vehicleMake;
    @NotBlank(message = "Vehicle model is required")
    private String vehicleModel;
    @NotBlank(message = "Vehicle plate is required")
    private String vehiclePlate;
    private String vehicleColor;
    private String vehicleType;

}
