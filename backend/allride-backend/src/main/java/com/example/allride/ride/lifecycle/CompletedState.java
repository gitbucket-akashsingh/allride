package com.example.allride.ride.lifecycle;

import com.example.allride.ride.entity.Ride;
import com.example.allride.ride.exception.RideInvalidStateException;

public class CompletedState implements RideState {

    @Override
    public void startRide(Ride ride) {
        throw new RideInvalidStateException("Ride already completed");
    }

    @Override
    public void completeRide(Ride ride) {
        throw new RideInvalidStateException("Ride already completed");
    }

    @Override
    public void cancelRide(Ride ride) {
        throw new RideInvalidStateException("Completed ride cannot be cancelled");
    }
}