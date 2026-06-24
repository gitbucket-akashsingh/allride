package com.example.allride.ride.lifecycle;

import com.example.allride.ride.entity.Ride;
import com.example.allride.ride.enums.RideStatus;
import com.example.allride.ride.exception.RideInvalidStateException;

public class RequestedState implements RideState {

    @Override
    public void startRide(Ride ride) {
        throw new RideInvalidStateException("Cannot start ride before acceptance");
    }

    @Override
    public void completeRide(Ride ride) {
        throw new RideInvalidStateException("Cannot complete ride before start");
    }

    @Override
    public void cancelRide(Ride ride) {
        ride.setStatus(RideStatus.CANCELLED);
    }
}