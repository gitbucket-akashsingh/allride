package com.example.allride.ride.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RideResponseDto {

    private Long rideId;
    private String status;
    private String message;
    private Double fare;
    private Double pickupLatitude;
    private Double pickupLongitude;
    private String pickupAddress;
    private Double dropLatitude;
    private Double dropLongitude;
    private String dropAddress;
    private String requestedAt;
    private String completedAt;
}
