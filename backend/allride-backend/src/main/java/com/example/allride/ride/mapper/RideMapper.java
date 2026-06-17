package com.example.allride.ride.mapper;

import com.example.allride.ride.dto.RideRequestDto;
import com.example.allride.ride.dto.RideResponseDto;
import com.example.allride.ride.entity.Ride;
import com.example.allride.ride.enums.RideStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class RideMapper {

    public Ride toEntity(RideRequestDto rideRequestDto, Long riderId) {
        return Ride.builder()
                .passengerId(riderId)
                .pickupLatitude(rideRequestDto.getPickupLatitude())
                .pickupLongitude(rideRequestDto.getPickupLongitude())
                .pickupAddress(rideRequestDto.getPickupAddress())
                .dropLatitude(rideRequestDto.getDropLatitude())
                .dropLongitude(rideRequestDto.getDropLongitude())
                .dropAddress(rideRequestDto.getDropAddress())
                .status(RideStatus.REQUESTED)
                .requestedAt(LocalDateTime.now())
                .build();
    }

    public RideResponseDto toResponse(Ride ride) {
        return RideResponseDto.builder()
                .rideId(ride.getId())
                .status(ride.getStatus().name())
                .fare(ride.getFare())
                .message("Ride requested successfully")
                .build();
    }


    public RideResponseDto mapToDto(Ride ride) {
        return RideResponseDto.builder()
                .rideId(ride.getId())
                .status(ride.getStatus().name())
                .fare(ride.getFare())
                .pickupLatitude(ride.getPickupLatitude())
                .pickupLongitude(ride.getPickupLongitude())
                .pickupAddress(ride.getPickupAddress())
                .dropLatitude(ride.getDropLatitude())
                .dropLongitude(ride.getDropLongitude())
                .dropAddress(ride.getDropAddress())
                .requestedAt(ride.getRequestedAt() != null ? ride.getRequestedAt().toString() : null)
                .completedAt(ride.getCompletedAt() != null ? ride.getCompletedAt().toString() : null)
                .build();
    }

}
