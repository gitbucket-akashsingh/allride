package com.example.allride.ride.service;

import com.example.allride.ride.dto.response.FareEstimateResponseDto;
import com.example.allride.ride.dto.request.RideRequestDto;
import com.example.allride.ride.dto.response.RideResponseDto;

import java.util.List;
import java.util.Optional;

public interface RideService {

    RideResponseDto requestRide(RideRequestDto dto, Long passengerId);

    FareEstimateResponseDto estimateFare(RideRequestDto dto);

    Optional<RideResponseDto> getActiveRide(Long userId, String role);

    List<RideResponseDto> getAvailableRides(Long driverUserId);

    RideResponseDto acceptRide(Long rideId, Long driverId);

    RideResponseDto startRide(Long rideId, Long driverId);

    RideResponseDto completeRide(Long rideId, Long driverId);

    RideResponseDto cancelRide(Long rideId, Long userId);

    RideResponseDto getRideStatus(Long rideId, Long userId);

    List<RideResponseDto> getMyRides(Long userId, String role);
}