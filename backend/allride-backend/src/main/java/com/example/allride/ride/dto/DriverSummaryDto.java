package com.example.allride.ride.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DriverSummaryDto {

    private Long userId;
    private String fullName;
    private String vehicleMake;
    private String vehicleModel;
    private String vehiclePlate;
    private String vehicleColor;
    private String vehicleType;
    private Double rating;
    private Double latitude;
    private Double longitude;
}