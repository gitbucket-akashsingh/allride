package com.example.allride.driver.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DriverProfileResponse {

    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String phone;
    private String licenseNumber;
    private Boolean online;
    private Boolean approved;
    private Double latitude;
    private Double longitude;
    private String vehicleMake;
    private String vehicleModel;
    private String vehiclePlate;
    private String vehicleColor;
    private String vehicleType;
    private Double rating;
    private Integer totalTrips;
}
