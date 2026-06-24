package com.example.allride.ride.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RideRequestDto {
    @NotNull
    private Double pickupLatitude;
    @NotNull
    private Double pickupLongitude;
    private String pickupAddress;

    @NotNull
    private Double dropLatitude;
    @NotNull
    private Double dropLongitude;
    private String dropAddress;
}
