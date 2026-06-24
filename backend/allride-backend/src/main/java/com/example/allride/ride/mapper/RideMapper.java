package com.example.allride.ride.mapper;

import com.example.allride.driver.entity.Driver;
import com.example.allride.driver.repository.DriverRepository;
import com.example.allride.ride.dto.DriverSummaryDto;
import com.example.allride.ride.dto.request.RideRequestDto;
import com.example.allride.ride.dto.response.RideResponseDto;
import com.example.allride.ride.entity.Ride;
import com.example.allride.ride.enums.RideStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class RideMapper {

    private final DriverRepository driverRepository;

    public Ride toEntity(RideRequestDto rideRequestDto, Long riderId) {
        return Ride.builder()
                .riderId(riderId)
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
        return mapToDto(ride);
    }

    public RideResponseDto mapToDto(Ride ride) {
        return RideResponseDto.builder()
                .rideId(ride.getId())
                .status(ride.getStatus().name())
                .fare(ride.getFare())
                .message("Ride requested successfully")
                .riderId(ride.getRiderId())
                .driverId(ride.getDriverId())
                .pickupLatitude(ride.getPickupLatitude())
                .pickupLongitude(ride.getPickupLongitude())
                .pickupAddress(ride.getPickupAddress())
                .dropLatitude(ride.getDropLatitude())
                .dropLongitude(ride.getDropLongitude())
                .dropAddress(ride.getDropAddress())
                .requestedAt(ride.getRequestedAt() != null ? ride.getRequestedAt().toString() : null)
                .startedAt(ride.getStartedAt() != null ? ride.getStartedAt().toString() : null)
                .completedAt(ride.getCompletedAt() != null ? ride.getCompletedAt().toString() : null)
                .driver(toDriverSummary(ride.getDriverId()))
                .build();
    }

    private DriverSummaryDto toDriverSummary(Long driverUserId) {
        if (driverUserId == null) {
            return null;
        }
        return driverRepository.findByUserId(driverUserId)
                .map(this::toDriverSummary)
                .orElse(null);
    }

    private DriverSummaryDto toDriverSummary(Driver driver) {
        return DriverSummaryDto.builder()
                .userId(driver.getUser().getId())
                .fullName(driver.getUser().getFullName())
                .vehicleMake(driver.getVehicleMake())
                .vehicleModel(driver.getVehicleModel())
                .vehiclePlate(driver.getVehiclePlate())
                .vehicleColor(driver.getVehicleColor())
                .vehicleType(driver.getVehicleType())
                .rating(driver.getRating())
                .latitude(driver.getLatitude())
                .longitude(driver.getLongitude())
                .build();
    }
}