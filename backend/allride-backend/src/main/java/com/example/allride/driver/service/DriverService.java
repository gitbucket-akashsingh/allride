package com.example.allride.driver.service;

import com.example.allride.auth.authentication.entity.User;
import com.example.allride.auth.common.enums.Role;
import com.example.allride.common.exception.ResourceNotFoundException;
import com.example.allride.driver.dto.LocationDto;
import com.example.allride.driver.dto.request.CreateDriverProfileRequest;
import com.example.allride.driver.dto.response.DriverProfileResponse;
import com.example.allride.driver.dto.response.DriverStatusResponse;
import com.example.allride.driver.entity.Driver;
import com.example.allride.driver.exception.*;
import com.example.allride.driver.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final DriverRepository driverRepository;

    @Transactional
    public DriverProfileResponse createProfile(CreateDriverProfileRequest request,
                                               Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        if (user.getRole() != Role.DRIVER) {
            throw new ResourceNotFoundException("Only drivers can create a driver profile");
        }
        if (driverRepository.existsByUserId(user.getId())) {
            throw new DriverProfileAlreadyExistsException();
        }
        if (driverRepository.findByLicenseNumber(request.getLicenseNumber()).isPresent()) {
            throw new DriverUnavailableException("License number already registered");
        }
        Driver driver = Driver.builder()
                .user(user)
                .licenseNumber(request.getLicenseNumber())
                .vehicleMake(request.getVehicleMake())
                .vehicleModel(request.getVehicleModel())
                .vehiclePlate(request.getVehiclePlate())
                .vehicleColor(request.getVehicleColor())
                .vehicleType(request.getVehicleType())
                .online(false)
                .approved(false) // requires manual admin approval.
                .rating(0.0)
                .totalTrips(0)
                .build();
        driverRepository.save(driver);
        return toResponse(driver, user);
    }

    public DriverProfileResponse getProfile(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        Driver driver = getDriverForUser(user);
        return toResponse(driver, user);
    }

    @Transactional
    public DriverStatusResponse goOnline(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        Driver driver = getDriverForUser(user);
        if (!Boolean.TRUE.equals(driver.getApproved())) {
            throw new DriverNotApprovedException();
        }
        driver.setOnline(true);
        driverRepository.save(driver);
        return DriverStatusResponse.builder()
                .online(true)
                .message("You are now online")
                .build();
    }

    @Transactional
    public DriverStatusResponse goOffline(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        Driver driver = getDriverForUser(user);
        driver.setOnline(false);
        driver.setLatitude(null);
        driver.setLongitude(null);
        driverRepository.save(driver);
        return DriverStatusResponse.builder()
                .online(false)
                .message("You are now offline")
                .build();
    }

    @Transactional
    public void updateLocation(Authentication authentication, LocationDto dto) {
        User user = getAuthenticatedUser(authentication);
        Driver driver = getDriverForUser(user);
        if (!Boolean.TRUE.equals(driver.getApproved())) {
            throw new DriverNotApprovedException();
        }
        if (!Boolean.TRUE.equals(driver.getOnline())) {
            throw new DriverOfflineException();
        }
        driver.setLatitude(dto.getLatitude());
        driver.setLongitude(dto.getLongitude());
        driverRepository.save(driver);
    }

    /**
     * Used by RideService when a driver accepts a ride
     */
    public void validateDriverCanAcceptRides(Long userId) {
        validateDriverIsApproved(userId);
        Driver driver = driverRepository.findByUserId(userId)
                .orElseThrow(DriverProfileNotFoundException::new);

        if (!Boolean.TRUE.equals(driver.getApproved())) {
            throw new DriverNotApprovedException();
        }
        if (!Boolean.TRUE.equals(driver.getOnline())) {
            throw new DriverUnavailableException("Driver must be online to accept rides");
        }
    }

    /**
     * Ensures driver exists and is approved.
     * Use before any ride-related action (list, accept, start, complete, location).
     */
    public void validateDriverIsApproved(Long userId) {
        Driver driver = driverRepository.findByUserId(userId)
                .orElseThrow(DriverProfileNotFoundException::new);

        if (!Boolean.TRUE.equals(driver.getApproved())) {
            throw new DriverNotApprovedException();
        }
    }

    @Transactional
    public void incrementTotalTrips(Long userId) {
        driverRepository.findByUserId(userId).ifPresent(driver -> {
            int current = driver.getTotalTrips() != null ? driver.getTotalTrips() : 0;
            driver.setTotalTrips(current + 1);
            driverRepository.save(driver);
        });
    }

    // ── helpers ──────────────────────────────────────────────
    private User getAuthenticatedUser(Authentication authentication) {
        Object principal = authentication.getPrincipal();
        if (principal instanceof User user) {
            return user;
        }
        throw new ResourceNotFoundException("Authenticated user not found");
    }

    private Driver getDriverForUser(User user) {
        return driverRepository.findByUserId(user.getId())
                .orElseThrow(DriverProfileNotFoundException::new);
    }

    private DriverProfileResponse toResponse(Driver driver, User user) {
        return DriverProfileResponse.builder()
                .id(driver.getId())
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .licenseNumber(driver.getLicenseNumber())
                .online(driver.getOnline())
                .approved(driver.getApproved())
                .latitude(driver.getLatitude())
                .longitude(driver.getLongitude())
                .vehicleMake(driver.getVehicleMake())
                .vehicleModel(driver.getVehicleModel())
                .vehiclePlate(driver.getVehiclePlate())
                .vehicleColor(driver.getVehicleColor())
                .vehicleType(driver.getVehicleType())
                .rating(driver.getRating())
                .totalTrips(driver.getTotalTrips())
                .build();
    }
}
