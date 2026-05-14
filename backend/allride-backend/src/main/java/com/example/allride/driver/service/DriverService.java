package com.example.allride.driver.service;

import com.example.allride.auth.authentication.entity.User;
import com.example.allride.auth.authentication.repository.UserRepository;
import com.example.allride.common.exception.ResourceNotFoundException;
import com.example.allride.driver.dto.LocationDto;
import com.example.allride.driver.dto.request.CreateDriverProfileRequest;
import com.example.allride.driver.dto.response.DriverProfileResponse;
import com.example.allride.driver.entity.Driver;
import com.example.allride.driver.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final DriverRepository driverRepository;
    private final UserRepository userRepository;


    public DriverProfileResponse createProfile(CreateDriverProfileRequest request, Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        if (driverRepository.findByUserId(user.getId()).isPresent()) {
            throw new RuntimeException("Driver profile already exists");
        }

        Driver driver = Driver.builder()
                .user(user)
                .licenseNumber(request.getLicenseNumber())
                .online(false)
                .approved(false)
                .rating(0.0)
                .totalTrips(0)
                .build();

        driverRepository.save(driver);

        return DriverProfileResponse.builder()
                .id(driver.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .licenseNumber(driver.getLicenseNumber())
                .online(driver.getOnline())
                .approved(driver.getApproved())
                .build();
    }

    @Transactional
    public void updateLocation(Long driverId, LocationDto dto) {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        if (!driver.isOnline()) {
            throw new RuntimeException("Driver is offline, cannot update location");
        }

        driver.setLatitude(dto.getLatitude());
        driver.setLongitude(dto.getLongitude());

        driverRepository.save(driver); // REQUIRED
    }

    @Transactional
    public void setOnline(Long driverId, boolean status) {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        driver.setOnline(status);

        if (!status) {
            // Optional but smart: clear location when offline
            driver.setLatitude(null);
            driver.setLongitude(null);
        }

        driverRepository.save(driver);
    }
}
