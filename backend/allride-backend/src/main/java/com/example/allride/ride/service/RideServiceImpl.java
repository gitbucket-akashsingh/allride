package com.example.allride.ride.service;

import com.example.allride.driver.service.DriverService;
import com.example.allride.ride.dto.response.FareEstimateResponseDto;
import com.example.allride.ride.dto.request.RideRequestDto;
import com.example.allride.ride.dto.response.RideResponseDto;
import com.example.allride.ride.entity.Ride;
import com.example.allride.ride.enums.RideStatus;
import com.example.allride.ride.exception.*;
import com.example.allride.ride.lifecycle.RideState;
import com.example.allride.ride.lifecycle.RideStateFactory;
import com.example.allride.ride.mapper.RideMapper;
import com.example.allride.ride.repository.RideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RideServiceImpl implements RideService {

    private static final List<RideStatus> RIDER_ACTIVE_STATUSES =
            List.of(RideStatus.REQUESTED, RideStatus.ACCEPTED, RideStatus.STARTED);

    private static final List<RideStatus> DRIVER_ACTIVE_STATUSES =
            List.of(RideStatus.ACCEPTED, RideStatus.STARTED);

    private final RideRepository rideRepository;
    private final RideMapper rideMapper;
    private final RideStateFactory stateFactory;
    private final FareService fareService;
    private final DistanceService distanceService;
    private final DriverService driverService;

    @Override
    public RideResponseDto requestRide(RideRequestDto rideRequestDto, Long passengerId) {
        double distance = distanceService.calculateDistance(
                rideRequestDto.getPickupLatitude(),
                rideRequestDto.getPickupLongitude(),
                rideRequestDto.getDropLatitude(),
                rideRequestDto.getDropLongitude()
        );
        double fare = fareService.calculateFare(distance);

        Ride ride = rideMapper.toEntity(rideRequestDto, passengerId);
        ride.setFare(fare);
        Ride saved = rideRepository.save(ride);
        return rideMapper.toResponse(saved);
    }

    @Override
    public FareEstimateResponseDto estimateFare(RideRequestDto dto) {
        double distance = distanceService.calculateDistance(
                dto.getPickupLatitude(),
                dto.getPickupLongitude(),
                dto.getDropLatitude(),
                dto.getDropLongitude()
        );
        double fare = fareService.calculateFare(distance);

        return FareEstimateResponseDto.builder()
                .distanceKm(round2(distance))
                .fare(round2(fare))
                .build();
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<RideResponseDto> getActiveRide(Long userId, String role) {
        List<RideStatus> statuses = "RIDER".equals(role)
                ? RIDER_ACTIVE_STATUSES
                : DRIVER_ACTIVE_STATUSES;

        Optional<Ride> ride = "RIDER".equals(role)
                ? rideRepository.findFirstByRiderIdAndStatusInOrderByRequestedAtDesc(userId, statuses)
                : rideRepository.findFirstByDriverIdAndStatusInOrderByRequestedAtDesc(userId, statuses);

        return ride.map(rideMapper::mapToDto);
    }

    @Transactional
    @Override
    public RideResponseDto acceptRide(Long rideId, Long driverId) {
        Ride ride = rideRepository.findByIdForUpdate(rideId)
                .orElseThrow(RideNotFoundException::new);
        driverService.validateDriverCanAcceptRides(driverId);

        if (ride.getStatus() == RideStatus.CANCELLED) {
            throw new RideAlreadyCancelledException();
        }
        if (ride.getStatus() == RideStatus.ACCEPTED || ride.getStatus() == RideStatus.STARTED) {
            throw new RideAlreadyAcceptedException();
        }
        if (ride.getStatus() != RideStatus.REQUESTED) {
            throw new RideInvalidStateException("Ride is not available for acceptance");
        }

        ride.setStatus(RideStatus.ACCEPTED);
        ride.setDriverId(driverId);

        Ride saved = rideRepository.save(ride);
        return rideMapper.mapToDto(saved);
    }

    @Override
    public List<RideResponseDto> getAvailableRides(Long driverUserId) {
        driverService.validateDriverIsApproved(driverUserId);

        return rideRepository.findByStatus(RideStatus.REQUESTED)
                .stream()
                .map(rideMapper::mapToDto)
                .toList();
    }

    @Transactional
    @Override
    public RideResponseDto startRide(Long rideId, Long driverId) {
        Ride ride = rideRepository.findByIdForUpdate(rideId)
                .orElseThrow(RideNotFoundException::new);

        driverService.validateDriverIsApproved(driverId);

        if (ride.getStatus() == RideStatus.CANCELLED) {
            throw new RideAlreadyCancelledException();
        }
        if (ride.getStatus() != RideStatus.ACCEPTED) {
            throw new RideInvalidStateException("Ride must be ACCEPTED to start");
        }
        if (!ride.getDriverId().equals(driverId)) {
            throw new RideNotAuthorizedException("Unauthorized driver");
        }

        RideState state = stateFactory.getState(ride.getStatus());
        state.startRide(ride);

        ride.setStatus(RideStatus.STARTED);
        ride.setStartedAt(LocalDateTime.now());
        rideRepository.save(ride);
        return rideMapper.mapToDto(ride);
    }

    @Transactional
    @Override
    public RideResponseDto completeRide(Long rideId, Long driverId) {
        Ride ride = rideRepository.findByIdForUpdate(rideId)
                .orElseThrow(RideNotFoundException::new);

        driverService.validateDriverIsApproved(driverId);

        if (ride.getStatus() == RideStatus.CANCELLED) {
            throw new RideAlreadyCancelledException();
        }
        if (ride.getStatus() != RideStatus.STARTED) {
            throw new RideInvalidStateException("Ride must be STARTED to complete");
        }
        if (!ride.getDriverId().equals(driverId)) {
            throw new RideNotAuthorizedException("Unauthorized driver");
        }

        RideState state = stateFactory.getState(ride.getStatus());
        state.completeRide(ride);

        ride.setStatus(RideStatus.COMPLETED);
        ride.setCompletedAt(LocalDateTime.now());

        Ride saved = rideRepository.save(ride);
        driverService.incrementTotalTrips(driverId);

        return rideMapper.mapToDto(saved);
    }

    @Transactional
    @Override
    public RideResponseDto cancelRide(Long rideId, Long userId) {
        Ride ride = rideRepository.findByIdForUpdate(rideId)
                .orElseThrow(RideNotFoundException::new);

        if (ride.getStatus() == RideStatus.COMPLETED) {
            throw new RideInvalidStateException("Completed ride cannot be cancelled");
        }
        if (ride.getStatus() == RideStatus.CANCELLED) {
            throw new RideAlreadyCancelledException();
        }

        boolean isRider = ride.getRiderId().equals(userId);
        boolean isDriver = ride.getDriverId() != null && ride.getDriverId().equals(userId);

        if (!isRider && !isDriver) {
            throw new RideNotAuthorizedException("Not authorized to cancel this ride");
        }

        if (isDriver) {
            driverService.validateDriverIsApproved(userId);
        }

        RideState state = stateFactory.getState(ride.getStatus());
        state.cancelRide(ride);

        ride.setStatus(RideStatus.CANCELLED);

        Ride saved = rideRepository.save(ride);
        return rideMapper.mapToDto(saved);
    }

    @Transactional(readOnly = true)
    @Override
    public RideResponseDto getRideStatus(Long rideId, Long userId) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(RideNotFoundException::new);

        boolean isRider = ride.getRiderId().equals(userId);
        boolean isDriver = ride.getDriverId() != null && ride.getDriverId().equals(userId);

        if (!isRider && !isDriver) {
            throw new RideNotAuthorizedException("Not authorized to view this ride");
        }

        return rideMapper.mapToDto(ride);
    }

    @Transactional(readOnly = true)
    @Override
    public List<RideResponseDto> getMyRides(Long userId, String role) {
        List<Ride> rides = "RIDER".equals(role)
                ? rideRepository.findByRiderIdOrderByRequestedAtDesc(userId)
                : rideRepository.findByDriverIdOrderByRequestedAtDesc(userId);

        return rides.stream()
                .map(rideMapper::mapToDto)
                .toList();
    }

    private double round2(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}