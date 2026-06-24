package com.example.allride.ride.lifecycle;

import com.example.allride.ride.entity.Ride;
import com.example.allride.ride.exception.RideAlreadyCancelledException;

public class CancelledState implements RideState {

    @Override
    public void startRide(Ride ride) {
        throw new RideAlreadyCancelledException();
    }

    @Override
    public void completeRide(Ride ride) {
        throw new RideAlreadyCancelledException();
    }

    @Override
    public void cancelRide(Ride ride) {
        throw new RideAlreadyCancelledException();
    }
}