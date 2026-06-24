package com.example.allride.driver.controller;

import com.example.allride.driver.dto.request.CreateDriverProfileRequest;
import com.example.allride.driver.dto.response.DriverProfileResponse;
import com.example.allride.driver.dto.response.DriverStatusResponse;
import com.example.allride.driver.service.DriverService;
import com.example.allride.driver.dto.LocationDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/driver")
@RequiredArgsConstructor
public class DriverController {

    private final DriverService driverService;

    @PostMapping("/profile")
    public ResponseEntity<DriverProfileResponse> createProfile(
            @Valid @RequestBody CreateDriverProfileRequest request,
            Authentication authentication) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(driverService.createProfile(request, authentication));
    }

    @GetMapping("/profile")
    public ResponseEntity<DriverProfileResponse> getProfile(Authentication authentication) {
        return ResponseEntity.ok(driverService.getProfile(authentication));
    }

    @PostMapping("/online")
    public ResponseEntity<DriverStatusResponse> goOnline(Authentication authentication) {
        return ResponseEntity.ok(driverService.goOnline(authentication));
    }

    @PostMapping("/offline")
    public ResponseEntity<DriverStatusResponse> goOffline(Authentication authentication) {
        return ResponseEntity.ok(driverService.goOffline(authentication));
    }

    @PostMapping("/location")
    public ResponseEntity<Void> updateLocation(
            @Valid @RequestBody LocationDto dto,
            Authentication authentication) {
        driverService.updateLocation(authentication, dto);
        return ResponseEntity.noContent().build();
    }

}
