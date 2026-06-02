# AllRide Frontend

Frontend application for the AllRide platform built using React and modern frontend engineering practices.

The frontend is responsible for delivering the user experience for:

- ride booking
- driver workflows
- authentication
- maps & routing
- realtime ride tracking
- responsive UI interactions
- future production-scale platform experiences

The project is being designed with inspiration from platforms like Uber and Ola while focusing on scalable frontend architecture and production-oriented engineering practices.

---

# Frontend Goals

The frontend aims to provide:

- scalable UI architecture
- modern responsive design
- reusable component system
- secure authentication flow
- realtime-ready UI workflows
- map & routing experiences
- production-grade frontend structure

---

# Tech Stack

## Core Technologies

- React
- Vite
- JavaScript
- React Router DOM
- Axios
- Tailwind CSS

---

## Map & Location Technologies

- React Leaflet
- OpenStreetMap
- OSRM Routing Engine

---

# Current Features

## Authentication

- Login page
- Signup page
- JWT token storage
- Protected routes
- Logout functionality
- Role selection (RIDER / DRIVER)

---

## Navigation & Layout

- Uber-inspired navbar
- conditional navbar rendering
- dashboard layout
- responsive UI structure

---

## Rider Features

- pickup location selection
- drop location selection
- route visualization
- ride booking preparation
- ride history UI preparation

---

## Driver Features

- driver dashboard
- online/offline toggle
- ride acceptance preparation

---

## Maps & Routing

- interactive maps
- pickup marker
- drop marker
- route drawing
- distance calculation
- ETA calculation

---

# Frontend Architecture

The frontend follows a modular component-based architecture.

```text
Pages
  │
  ▼
Layouts
  │
  ▼
Reusable Components
  │
  ▼
API Layer
  │
  ▼
Backend Services
```

---

# Project Structure

```text
allride-frontend/
│
├── public/
│
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   └── utils/
│
├── package.json
├── vite.config.js
└── README.md
```

---

# Folder Responsibilities

## api/

Contains API configuration and Axios setup.

Examples:

- Axios instance
- interceptors
- token attachment
- API utilities

---

## components/

Contains reusable UI components.

Examples:

- Navbar
- RideCard
- DriverCard
- Loader
- Toast
- Form inputs

Purpose:
Build reusable UI systems.

---

## layouts/

Contains shared layout structures.

Examples:

- dashboard layout
- navbar layout
- sidebar layout

Purpose:
Maintain consistent page structure.

---

## pages/

Contains route-level screens.

Examples:

- Home
- Login
- Signup
- Rider Dashboard
- Driver Dashboard

Purpose:
Represent application views.

---

## routes/

Contains route management and protected routing logic.

Examples:

- ProtectedRoute
- route configuration

Purpose:
Manage frontend navigation and security.

---

## services/

Contains frontend business interaction logic.

Examples:

- ride service
- auth service
- map service

Purpose:
Separate API interaction from UI components.

---

## styles/

Contains global styling configuration.

Examples:

- Tailwind imports
- global CSS
- theme styles

Purpose:
Centralize styling setup.

---

## utils/

Contains helper functions and reusable utilities.

Examples:

- token utilities
- formatters
- constants

Purpose:
Reduce repeated logic.

---

# Authentication Flow

Frontend authentication workflow:

```text
User Login
    │
    ▼
Backend Returns JWT
    │
    ▼
Frontend Stores Token
    │
    ▼
Axios Interceptor Attaches Token
    │
    ▼
Protected APIs Accessible
```

---

# API Communication

Frontend communicates with backend using REST APIs.

Main communication responsibilities:

- authentication requests
- ride requests
- driver operations
- route data
- realtime event preparation

---

# Map Architecture

Current map flow:

```text
User Inputs Locations
        │
        ▼
Geocoding Converts Text → Coordinates
        │
        ▼
Map Displays Markers
        │
        ▼
OSRM Generates Route
        │
        ▼
Frontend Draws Polyline
```

---

# Planned Frontend Evolution

## Phase 1 — Core UI

- authentication
- dashboards
- map integration
- route visualization

---

## Phase 2 — Ride Booking Experience

- nearby drivers
- live ride status
- ride lifecycle UI
- fare estimation

---

## Phase 3 — Realtime Systems

- WebSocket integration
- live driver tracking
- realtime ride updates
- realtime notifications

---

## Phase 4 — Advanced Platform Features

- payments UI
- admin dashboard
- analytics UI
- feature flags
- operational tooling

---

# UI/UX Direction

Frontend design direction aims toward:

- modern responsive layouts
- clean spacing systems
- reusable design patterns
- production-grade user experience
- scalable component architecture

Inspired by:

- :contentReference[oaicite:0]{index=0}
- :contentReference[oaicite:1]{index=1}

---

# Local Development Setup

## Prerequisites

Required tools:

- Node.js
- npm

---

# Install Dependencies

```bash
npm install
```

---

# Start Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Environment Variables

Example:

```env
VITE_API_BASE_URL=http://localhost:8080
```

---

# Engineering Principles

## 1. Reusable Components

UI should be built using reusable modular components rather than duplicated code.

---

## 2. Separation of Concerns

Pages, layouts, components, and API logic should remain organized independently.

---

## 3. Incremental Evolution

The frontend should evolve gradually from:

- simple UI
  → realtime experiences
  → scalable frontend platform

---

## 4. Backend Owns Security

Frontend may hide UI features,
but backend always validates:

- authentication
- authorization
- permissions

---

## 5. Production-Oriented Development

Frontend development includes:

- roadmap planning
- reusable architecture
- deployment planning
- scalable structure
- engineering documentation

similar to real-world frontend engineering teams.

---

# Future Frontend Direction

Future engineering goals include:

- realtime ride experiences
- microfrontend exploration
- PWA support
- mobile-first optimization
- cloud deployment
- performance optimization
- advanced state management

---

# Long-Term Vision

The long-term goal is to evolve AllRide Frontend into:

- scalable ride-booking UI platform
- realtime frontend ecosystem
- production-grade user experience
- cloud-deployable frontend system
- enterprise-ready frontend architecture

while maintaining clean UI engineering practices and scalable frontend organization.

# ---------------------------------------------------------------------------------

# ALLRIDE — COMPLETE RIDE BOOKING IMPLEMENTATION FLOW

This document is your COMPLETE implementation blueprint for:

- React + Vite frontend
- Spring Boot backend
- Ride booking architecture
- Real-time tracking
- Authentication
- Driver matching
- Ride lifecycle
- Socket communication
- Payment integration
- Production-grade architecture

This guide explains:

```text
WHO DOES WHAT
WHEN IT HAPPENS
WHY IT HAPPENS
HOW TO IMPLEMENT IT
```

This is the exact mental model used in real ride-booking systems.

---

# 1. COMPLETE SYSTEM ARCHITECTURE

---

# FRONTEND RESPONSIBILITIES

Frontend owns:

```text
UI rendering
maps
forms
animations
screen state
socket listening
routing
user interaction
```

Frontend NEVER owns:

```text
trusted business logic
real fare calculation
security
authorization
payment verification
```

---

# BACKEND RESPONSIBILITIES

Backend owns:

```text
authentication
authorization
ride engine
matching engine
fare engine
payment verification
database
socket broadcasting
ride lifecycle
```

Backend is the source of truth.

---

# HIGH LEVEL FLOW

```text
User Login
   ↓
Frontend stores JWT
   ↓
User selects pickup/drop
   ↓
Frontend draws route using Mapbox
   ↓
Frontend requests fare estimate
   ↓
Backend calculates real fare
   ↓
Frontend displays estimate
   ↓
User confirms ride
   ↓
Backend creates ride
   ↓
Backend finds nearby drivers
   ↓
Driver accepts ride
   ↓
Backend assigns driver
   ↓
Socket events update frontend
   ↓
Live tracking starts
   ↓
Ride completed
```

---

# 2. COMPLETE FRONTEND ARCHITECTURE

---

# RECOMMENDED STRUCTURE

```text
src/
│
├── app/
│   ├── layouts/
│   ├── routes/
│   ├── providers/
│   └── store/
│
├── features/
│   ├── auth/
│   ├── booking/
│   ├── rider/
│   ├── driver/
│   ├── tracking/
│   ├── payments/
│   └── map/
│
├── shared/
│   ├── api/
│   ├── sockets/
│   ├── ui/
│   ├── hooks/
│   ├── utils/
│   └── constants/
│
└── assets/
```

---

# BOOKING FEATURE STRUCTURE

```text
features/booking/
│
├── api/
│   ├── bookingApi.js
│   └── fareApi.js
│
├── components/
│   ├── PickupInput.jsx
│   ├── DropInput.jsx
│   ├── VehicleSelector.jsx
│   ├── FareCard.jsx
│   ├── DriverCard.jsx
│   ├── RideBottomSheet.jsx
│   └── BookingMap.jsx
│
├── hooks/
│   ├── useBooking.js
│   ├── useFareEstimate.js
│   └── useDriverTracking.js
│
├── pages/
│   └── BookRidePage.jsx
│
├── services/
│   └── bookingSocketService.js
│
├── store/
│   └── bookingStore.js
│
├── validations/
│   └── bookingSchema.js
│
└── utils/
    └── bookingUtils.js
```

---

# 3. COMPLETE BACKEND ARCHITECTURE

---

# SPRING BOOT STRUCTURE

```text
src/main/java/com/allride/
│
├── auth/
├── booking/
├── driver/
├── rider/
├── payment/
├── tracking/
├── socket/
├── config/
├── common/
└── security/
```

---

# BOOKING MODULE STRUCTURE

```text
booking/
│
├── controller/
│   └── RideController.java
│
├── service/
│   ├── RideService.java
│   ├── FareService.java
│   ├── MatchingService.java
│   └── TrackingService.java
│
├── dto/
│   ├── RideRequestDto.java
│   ├── FareEstimateRequestDto.java
│   ├── FareEstimateResponseDto.java
│   └── RideResponseDto.java
│
├── entity/
│   ├── Ride.java
│   └── RideStatus.java
│
├── repository/
│   └── RideRepository.java
│
└── socket/
    └── RideSocketPublisher.java
```

---

# 4. LOGIN IMPLEMENTATION FLOW

---

# FRONTEND LOGIN FLOW

---

# FILES INVOLVED

```text
features/auth/pages/LoginPage.jsx
features/auth/components/LoginForm.jsx
features/auth/api/authApi.js
features/auth/store/authStore.js
shared/api/axiosInstance.js
```

---

# LOGIN FLOW

```text
User types credentials
   ↓
Frontend validates form
   ↓
POST /api/auth/login
   ↓
Spring Boot validates user
   ↓
JWT generated
   ↓
Frontend stores token
   ↓
Redirect to dashboard
```

---

# FRONTEND LOGIN API

```js
// features/auth/api/authApi.js

import axios from "@/shared/api/axiosInstance";

export const login = async (payload) => {
  const response = await axios.post("/auth/login", payload);
  return response.data;
};
```

---

# LOGIN FORM SUBMIT

```js
const handleLogin = async () => {
  try {
    const response = await login({
      email,
      password,
    });

    localStorage.setItem("token", response.token);

    authStore.setUser(response.user);

    navigate("/rider/dashboard");
  } catch (error) {
    console.error(error);
  }
};
```

---

# SPRING CONTROLLER

```java
@PostMapping("/login")
public ResponseEntity<LoginResponseDto> login(
   @RequestBody LoginRequestDto dto
) {
   return ResponseEntity.ok(authService.login(dto));
}
```

---

# SERVICE LOGIC

```java
public LoginResponseDto login(LoginRequestDto dto) {

   User user = userRepository
      .findByEmail(dto.getEmail())
      .orElseThrow();

   boolean valid = passwordEncoder.matches(
      dto.getPassword(),
      user.getPassword()
   );

   if(!valid) {
      throw new RuntimeException("Invalid credentials");
   }

   String token = jwtService.generateToken(user);

   return new LoginResponseDto(token, user);
}
```

---

# 5. BOOKING FLOW IMPLEMENTATION

THIS IS THE CORE OF ALLRIDE.

---

# PHASE 1 — USER SELECTS LOCATIONS

---

# FRONTEND RESPONSIBILITY

Frontend should:

```text
render map
show autocomplete
store coordinates
show route preview
```

---

# FILES INVOLVED

```text
features/booking/components/PickupInput.jsx
features/booking/components/DropInput.jsx
features/booking/components/BookingMap.jsx
features/map/services/mapboxService.js
```

---

# MAPBOX GEOCODING FLOW

```text
User types location
   ↓
Frontend calls Mapbox API
   ↓
Mapbox returns coordinates
   ↓
Frontend stores coordinates
```

---

# FRONTEND STATE

```js
const [pickup, setPickup] = useState(null);
const [drop, setDrop] = useState(null);
```

---

# MAPBOX SERVICE

```js
export const searchPlace = async (query) => {
   const response = await fetch(...)
   return response.json()
}
```

---

# PHASE 2 — DRAW ROUTE

---

# FLOW

```text
Pickup selected
Drop selected
   ↓
Frontend calls Mapbox Directions API
   ↓
Distance + geometry returned
   ↓
Frontend draws polyline
```

---

# IMPORTANT

Mapbox distance is:

```text
visual estimation
```

NOT trusted business fare.

Backend still calculates final pricing.

---

# PHASE 3 — FARE ESTIMATION

---

# FRONTEND REQUEST

```http
POST /api/rides/estimate
```

Payload:

```json
{
  "pickup": {
    "lat": 28.63,
    "lng": 77.21
  },
  "drop": {
    "lat": 28.55,
    "lng": 77.3
  },
  "vehicleType": "SEDAN"
}
```

---

# FRONTEND FILES

```text
features/booking/api/fareApi.js
features/booking/hooks/useFareEstimate.js
features/booking/components/FareCard.jsx
```

---

# FRONTEND API

```js
export const estimateFare = async (payload) => {
  const response = await axios.post("/rides/estimate", payload);

  return response.data;
};
```

---

# SPRING CONTROLLER

```java
@PostMapping("/estimate")
public ResponseEntity<FareEstimateResponseDto> estimate(
   @RequestBody FareEstimateRequestDto dto
) {
   return ResponseEntity.ok(
      fareService.estimate(dto)
   );
}
```

---

# FARE SERVICE

```java
public FareEstimateResponseDto estimate(
   FareEstimateRequestDto dto
) {

   double distance = mapService.calculateDistance(...);

   double baseFare = 50;

   double distanceFare = distance * 12;

   double total = baseFare + distanceFare;

   return new FareEstimateResponseDto(total);
}
```

---

# FRONTEND DISPLAYS FARE

```text
₹320
12km
18 mins
```

---

# PHASE 4 — USER CONFIRMS BOOKING

---

# FRONTEND REQUEST

```http
POST /api/rides/book
```

Headers:

```http
Authorization: Bearer JWT_TOKEN
```

Payload:

```json
{
  "pickup": {...},
  "drop": {...},
  "vehicleType": "SEDAN",
  "paymentMethod": "UPI"
}
```

---

# FRONTEND FILES

```text
features/booking/api/bookingApi.js
features/booking/hooks/useBooking.js
features/booking/store/bookingStore.js
```

---

# FRONTEND API

```js
export const bookRide = async (payload) => {
  const response = await axios.post("/rides/book", payload);

  return response.data;
};
```

---

# BACKEND FLOW

```text
Controller
   ↓
RideService
   ↓
Create Ride Entity
   ↓
Find Nearby Drivers
   ↓
Broadcast Socket Events
```

---

# CONTROLLER

```java
@PostMapping("/book")
public ResponseEntity<RideResponseDto> bookRide(
   @RequestBody RideRequestDto dto,
   Authentication authentication
) {
   return ResponseEntity.ok(
      rideService.bookRide(dto, authentication)
   );
}
```

---

# SERVICE IMPLEMENTATION

```java
public RideResponseDto bookRide(
   RideRequestDto dto,
   Authentication authentication
) {

   User rider = (User) authentication.getPrincipal();

   Ride ride = new Ride();

   ride.setRider(rider);
   ride.setPickupLat(dto.getPickup().getLat());
   ride.setPickupLng(dto.getPickup().getLng());
   ride.setDropLat(dto.getDrop().getLat());
   ride.setDropLng(dto.getDrop().getLng());

   ride.setStatus(RideStatus.REQUESTED);

   rideRepository.save(ride);

   matchingService.findDrivers(ride);

   return RideMapper.toDto(ride);
}
```

---

# 6. DRIVER MATCHING FLOW

---

# MATCHING ENGINE RESPONSIBILITY

Backend should:

```text
find nearby drivers
check availability
send requests
assign driver
```

---

# FLOW

```text
Ride created
   ↓
MatchingService triggered
   ↓
Nearby drivers queried
   ↓
Socket event broadcast
```

---

# MATCHING SERVICE

```java
public void findDrivers(Ride ride) {

   List<Driver> drivers = driverService
      .findNearbyDrivers(
         ride.getPickupLat(),
         ride.getPickupLng()
      );

   socketPublisher.broadcastRideRequest(
      drivers,
      ride
   );
}
```

---

# SOCKET EVENT

```json
{
  "event": "NEW_RIDE_REQUEST",
  "rideId": 12,
  "pickup": "Connaught Place"
}
```

---

# 7. DRIVER ACCEPT FLOW

---

# DRIVER FRONTEND

Driver app receives:

```text
NEW_RIDE_REQUEST
```

Driver clicks:

```text
ACCEPT
```

---

# FRONTEND REQUEST

```http
POST /api/rides/accept
```

Payload:

```json
{
  "rideId": 12
}
```

---

# BACKEND FLOW

```text
Validate driver
   ↓
Assign driver
   ↓
Update ride status
   ↓
Broadcast updates
```

---

# SERVICE

```java
public RideResponseDto acceptRide(
   Long rideId,
   Driver driver
) {

   Ride ride = rideRepository
      .findById(rideId)
      .orElseThrow();

   ride.setDriver(driver);

   ride.setStatus(RideStatus.DRIVER_ASSIGNED);

   rideRepository.save(ride);

   socketPublisher.notifyRider(ride);

   return RideMapper.toDto(ride);
}
```

---

# 8. LIVE TRACKING FLOW

---

# DRIVER GPS FLOW

```text
Driver device GPS
   ↓
Driver frontend
   ↓
Socket emits location
   ↓
Backend receives location
   ↓
Backend broadcasts to rider
   ↓
Rider frontend updates map
```

---

# DRIVER SOCKET EVENT

```json
{
  "rideId": 12,
  "lat": 28.61,
  "lng": 77.29
}
```

---

# RIDER FRONTEND

Frontend updates:

```text
driver marker
ETA
polyline
arrival estimate
```

---

# 9. RIDE STATUS MACHINE

---

# IMPORTANT

Backend controls status truth.

Frontend only visualizes it.

---

# STATES

```text
REQUESTED
DRIVER_ASSIGNED
DRIVER_ARRIVED
STARTED
COMPLETED
CANCELLED
```

---

# FLOW

```text
REQUESTED
   ↓
DRIVER_ASSIGNED
   ↓
DRIVER_ARRIVED
   ↓
STARTED
   ↓
COMPLETED
```

---

# 10. PAYMENT FLOW

---

# FRONTEND

Frontend should:

```text
show payment UI
collect payment method
launch Razorpay/Stripe SDK
```

---

# BACKEND

Backend should:

```text
create payment order
verify payment signature
store transaction
prevent fraud
```

---

# FLOW

```text
Frontend requests payment order
   ↓
Backend creates Razorpay order
   ↓
Frontend launches payment SDK
   ↓
Payment success callback
   ↓
Frontend sends verification request
   ↓
Backend verifies signature
   ↓
Ride marked paid
```

---

# 11. SOCKET ARCHITECTURE

---

# SOCKET EVENTS

```text
NEW_RIDE_REQUEST
DRIVER_ASSIGNED
DRIVER_MOVING
DRIVER_ARRIVED
RIDE_STARTED
RIDE_COMPLETED
RIDE_CANCELLED
```

---

# FRONTEND SOCKET RESPONSIBILITY

Frontend should:

```text
listen to events
update UI
update markers
show notifications
```

---

# BACKEND SOCKET RESPONSIBILITY

Backend should:

```text
broadcast events
manage rooms
manage sessions
validate ride state
```

---

# 12. DATABASE TABLES

---

# USERS

```text
id
name
email
password
role
```

---

# DRIVERS

```text
id
vehicle_number
availability
current_lat
current_lng
```

---

# RIDES

```text
id
rider_id
driver_id
pickup_lat
pickup_lng
drop_lat
drop_lng
status
fare
created_at
```

---

# PAYMENTS

```text
id
ride_id
amount
status
payment_gateway_id
```

---

# 13. COMPLETE END-TO-END FLOW

---

# LOGIN FLOW

```text
Frontend form
   ↓
HTTP request
   ↓
Spring controller
   ↓
Service validation
   ↓
Database query
   ↓
JWT generated
   ↓
Frontend stores token
```

---

# BOOKING FLOW

```text
User selects locations
   ↓
Frontend draws route
   ↓
Frontend requests estimate
   ↓
Backend calculates fare
   ↓
Frontend displays fare
   ↓
User confirms booking
   ↓
Backend creates ride
   ↓
Matching engine runs
   ↓
Socket events broadcast
   ↓
Driver accepts ride
   ↓
Backend assigns driver
   ↓
Frontend updates UI
   ↓
Live tracking begins
```

---

# 14. FINAL FRONTEND VS BACKEND RULE

---

# FRONTEND THINKS

```text
What should user SEE?
```

Examples:

```text
map
animation
cards
forms
tracking
loading
bottom sheets
```

---

# BACKEND THINKS

```text
What is ACTUALLY TRUE?
```

Examples:

```text
authentication
fare
driver matching
payment verification
ride state
security
```

---

# 15. WHAT YOU SHOULD BUILD NEXT

Recommended implementation order.

---

# PHASE 1

```text
Authentication
JWT
Protected routes
```

---

# PHASE 2

```text
Mapbox integration
Autocomplete
Route drawing
Distance calculation
```

---

# PHASE 3

```text
Fare estimation API
Booking API
Ride entity
Ride lifecycle
```

---

# PHASE 4

```text
Driver module
Driver availability
Matching engine
```

---

# PHASE 5

```text
Socket.IO/WebSocket
Live tracking
Real-time updates
```

---

# PHASE 6

```text
Payment integration
Ride completion
Ride history
```

---

# PHASE 7

```text
Production optimization
Caching
Scalability
Microservices
Redis
Kafka
```

This architecture is enough to build a real-world Uber-style ride booking platform.
