package com.example.allride.driver.entity;

import com.example.allride.auth.authentication.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "drivers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    @Column(nullable = false, unique = true)
    private String licenseNumber;
    @Column(nullable = false)
    private Boolean online;
    @Column(nullable = false)
    private Boolean approved;
    private Double latitude;
    private Double longitude;
    private String vehicleMake;
    private String vehicleModel;
    private String vehiclePlate;
    private String vehicleColor;
    private String vehicleType;
    private Double rating;
    private Integer totalTrips;
}
