package com.example.allride.ride.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FareEstimateResponseDto {

    private Double distanceKm;
    private Double fare;
}