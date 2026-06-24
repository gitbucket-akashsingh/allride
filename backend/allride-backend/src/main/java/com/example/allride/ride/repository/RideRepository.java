package com.example.allride.ride.repository;

import com.example.allride.ride.enums.RideStatus;
import com.example.allride.ride.entity.Ride;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RideRepository extends JpaRepository<Ride, Long> {

    List<Ride> findByRiderIdOrderByRequestedAtDesc(Long riderId);

    List<Ride> findByDriverIdOrderByRequestedAtDesc(Long driverId);

    List<Ride> findByStatus(RideStatus status);

    Optional<Ride> findFirstByRiderIdAndStatusInOrderByRequestedAtDesc(
            Long riderId, List<RideStatus> statuses);

    Optional<Ride> findFirstByDriverIdAndStatusInOrderByRequestedAtDesc(
            Long driverId, List<RideStatus> statuses);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT r FROM Ride r WHERE r.id = :id")
    Optional<Ride> findByIdForUpdate(Long id);
}