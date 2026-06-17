package com.example.allride.ride.entity;

import com.example.allride.ride.enums.RideStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "rides")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double pickupLatitude;
    private Double pickupLongitude;
    private String pickupAddress;

    private Double dropLatitude;
    private Double dropLongitude;
    private String dropAddress;

    private Double fare;

    @Enumerated(EnumType.STRING)
    private RideStatus status;

    private LocalDateTime requestedAt;

    private LocalDateTime startedAt;

    private LocalDateTime completedAt;

//    private Long riderId;
    private Long passengerId;

    private Long driverId;

    private boolean isOnline;

    private Double latitude;
    private Double longitude;
}
