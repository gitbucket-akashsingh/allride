package com.example.allride.ride.dto.response;

import com.example.allride.ride.dto.DriverSummaryDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RideResponseDto {

    private Long rideId;
    private String status;
    private String message;
    private Double fare;
    private Long riderId;
    private Long driverId;
    private Double pickupLatitude;
    private Double pickupLongitude;
    private String pickupAddress;
    private Double dropLatitude;
    private Double dropLongitude;
    private String dropAddress;
    private String requestedAt;
    private String startedAt;
    private String completedAt;
    private DriverSummaryDto driver;
}
