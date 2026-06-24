export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
  },

  RIDES: {
    ESTIMATE: "/rides/estimate",
    REQUEST: "/rides/request",
    ACTIVE: "/rides/active",
    MY_RIDES: "/rides/my-rides",
    STATUS: (rideId) => `/rides/${rideId}/status`,
    CANCEL: (rideId) => `/rides/${rideId}/cancel`,
  },

  DRIVER: {
    PROFILE: "/driver/profile",
    ONLINE: "/driver/online",
    OFFLINE: "/driver/offline",
    LOCATION: "/driver/location",
  },
};