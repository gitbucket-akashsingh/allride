# AllRide Development Stories

These stories are structured similarly to how real product engineering teams at companies like Uber organize implementation work.

Each story should eventually become:

- a GitHub Issue
- a Jira ticket
- a task card inside GitHub Projects

---

# STORY FORMAT

Each story contains:

```text id="m7q2v5"
Story ID
Title
Goal
Description
Acceptance Criteria
Priority
Status
```

---

# EPIC 1 — Project Foundation & Developer Experience

# STORY AF-001

## Setup React Frontend Project

### Goal

Initialize frontend application.

### Description

Setup React + Vite application architecture.

### Acceptance Criteria

- React app runs
- Vite configured
- src structure created

### Priority

High

### Status

Done

---

# STORY AF-002

## Setup Spring Boot Backend

### Goal

Initialize backend architecture.

### Acceptance Criteria

- Spring Boot app runs
- Modular structure created
- Maven build works

### Status

Done

---

# STORY AF-003

## Configure Tailwind CSS

### Goal

Enable utility-first styling.

### Acceptance Criteria

- Tailwind installed
- Tailwind classes working
- Global CSS configured

### Status

Done

---

# STORY AF-004

## Setup React Router

### Goal

Enable page navigation.

### Acceptance Criteria

- Routes configured
- Navigation working
- Protected routes possible

### Status

Done

---

# STORY AF-005

## Setup Axios API Client

### Goal

Centralize API communication.

### Acceptance Criteria

- Axios instance created
- Base URL configured
- API requests working

### Status

Done

---

# EPIC 2 — Authentication & Authorization

# STORY AUTH-001

## Create Signup API

### Goal

Allow new users to register.

### Acceptance Criteria

- User saved in DB
- Password encrypted
- Role assigned

### Status

Done

---

# STORY AUTH-002

## Create Login API

### Goal

Authenticate users.

### Acceptance Criteria

- Email/password validated
- JWT token generated
- Login response returned

### Status

Done

---

# STORY AUTH-003

## Build Login UI

### Goal

Allow users to login visually.

### Acceptance Criteria

- Login form created
- API connected
- Error handling added

### Status

Done

---

# STORY AUTH-004

## Build Signup UI

### Goal

Allow users to signup visually.

### Acceptance Criteria

- Signup form created
- Role dropdown added
- API connected

### Status

Done

---

# STORY AUTH-005

## Implement JWT Storage

### Goal

Persist authenticated sessions.

### Acceptance Criteria

- JWT saved in localStorage
- Token accessible globally

### Status

Done

---

# STORY AUTH-006

## Implement Axios JWT Interceptor

### Goal

Automatically attach JWT to requests.

### Acceptance Criteria

- Authorization header added automatically

### Status

Done

---

# STORY AUTH-007

## Implement Protected Routes

### Goal

Prevent unauthorized page access.

### Acceptance Criteria

- Dashboard inaccessible without token
- Redirect to login works

### Status

Done

---

# STORY AUTH-008

## Implement Logout Flow

### Goal

Allow users to terminate sessions.

### Acceptance Criteria

- Token removed
- Redirect works

### Status

Done

---

# EPIC 3 — Shared UI & Layout System

# STORY UI-001

## Create Main Layout

### Goal

Provide shared app shell.

### Acceptance Criteria

- Navbar shared
- Sidebar shared
- Content wrapper added

### Status

Done

---

# STORY UI-002

## Create Uber-Style Navbar

### Goal

Provide production-like navigation.

### Acceptance Criteria

- Left/right alignment works
- Responsive layout works
- Conditional auth rendering works

### Status

Done

---

# STORY UI-003

## Create Shared Sidebar

### Goal

Enable dashboard navigation.

### Acceptance Criteria

- Sidebar visible in dashboard
- Navigation links work

### Status

Done

---

# STORY UI-004

## Create Reusable Button Component

### Goal

Standardize buttons.

### Acceptance Criteria

- Primary button reusable
- Tailwind consistent

### Status

Done

---

# STORY UI-005

## Create Reusable Input Component

### Goal

Standardize form inputs.

### Acceptance Criteria

- Shared InputField component used

### Status

Done

---

# EPIC 4 — Rider Booking Experience

# STORY RIDE-001

## Create Rider Dashboard

### Goal

Provide rider interaction screen.

### Acceptance Criteria

- Rider dashboard accessible
- Booking section visible

### Status

Done

---

# STORY RIDE-002

## Add Pickup Location Input

### Goal

Allow pickup entry.

### Acceptance Criteria

- Input captures pickup text

### Status

Done

---

# STORY RIDE-003

## Add Drop Location Input

### Goal

Allow drop entry.

### Acceptance Criteria

- Input captures destination

### Status

Done

---

# STORY RIDE-004

## Add Book Ride Button

### Goal

Trigger ride flow.

### Acceptance Criteria

- Button triggers route logic

### Status

Done

---

# STORY RIDE-005

## Create Ride Request API

### Goal

Persist ride requests in backend.

### Acceptance Criteria

- Ride stored in DB
- Rider associated

### Status

Todo

---

# STORY RIDE-006

## Fetch Ride History

### Goal

Display previous rides.

### Acceptance Criteria

- Ride history API works
- UI displays rides

### Status

Todo

---

# EPIC 5 — Maps & Routing

# STORY MAP-001

## Integrate Leaflet Map

### Goal

Display interactive map.

### Acceptance Criteria

- Map visible
- Map responsive

### Status

Done

---

# STORY MAP-002

## Add Pickup Marker

### Goal

Show pickup visually.

### Acceptance Criteria

- Marker visible on map

### Status

Done

---

# STORY MAP-003

## Add Drop Marker

### Goal

Show drop visually.

### Acceptance Criteria

- Destination marker visible

### Status

Done

---

# STORY MAP-004

## Implement Geocoding Service

### Goal

Convert addresses to coordinates.

### Acceptance Criteria

- Address converted to lat/lng

### Status

Done

---

# STORY MAP-005

## Integrate OSRM Routing

### Goal

Calculate road route.

### Acceptance Criteria

- Route API returns path

### Status

Done

---

# STORY MAP-006

## Draw Route Polyline

### Goal

Render road path on map.

### Acceptance Criteria

- Polyline visible

### Status

Done

---

# STORY MAP-007

## Show Distance & ETA

### Goal

Display route metrics.

### Acceptance Criteria

- Distance visible
- ETA visible

### Status

Done

---

# EPIC 6 — Driver System

# STORY DRIVER-001

## Create Driver Dashboard

### Goal

Provide driver workspace.

### Acceptance Criteria

- Driver dashboard accessible

### Status

Done

---

# STORY DRIVER-002

## Implement Online/Offline Toggle

### Goal

Allow driver availability updates.

### Acceptance Criteria

- Driver status changes

### Status

Todo

---

# STORY DRIVER-003

## Create Accept Ride API

### Goal

Allow drivers to accept rides.

### Acceptance Criteria

- Ride status updated

### Status

Todo

---

# STORY DRIVER-004

## Create Reject Ride API

### Goal

Allow drivers to reject rides.

### Acceptance Criteria

- Ride remains available

### Status

Todo

---

# EPIC 7 — Nearby Drivers

# STORY NEAR-001

## Store Driver Coordinates

### Goal

Persist driver locations.

### Acceptance Criteria

- Driver lat/lng saved

### Status

Todo

---

# STORY NEAR-002

## Create Nearby Drivers API

### Goal

Fetch nearest drivers.

### Acceptance Criteria

- Nearby drivers returned

### Status

Todo

---

# STORY NEAR-003

## Render Driver Markers

### Goal

Show nearby drivers on map.

### Acceptance Criteria

- Driver markers visible

### Status

Todo

---

# EPIC 8 — Ride Lifecycle

# STORY LIFE-001

## Create Ride Status Enum

### Goal

Track ride progression.

### Acceptance Criteria

- Ride states defined

### Status

Todo

---

# STORY LIFE-002

## Implement Ride Status Updates

### Goal

Synchronize ride state.

### Acceptance Criteria

- Status transitions work

### Status

Todo

---

# STORY LIFE-003

## Show Ride Status UI

### Goal

Display ride lifecycle to users.

### Acceptance Criteria

- Rider sees current ride state

### Status

Todo

---

# EPIC 9 — Realtime WebSocket System

# STORY WS-001

## Setup WebSocket Backend

### Goal

Enable realtime communication.

### Acceptance Criteria

- WebSocket server running

### Status

Todo

---

# STORY WS-002

## Setup Frontend Socket Client

### Goal

Connect frontend to realtime server.

### Acceptance Criteria

- Frontend receives events

### Status

Todo

---

# STORY WS-003

## Broadcast Ride Updates

### Goal

Sync rider & driver instantly.

### Acceptance Criteria

- Ride changes pushed live

### Status

Todo

---

# EPIC 10 — Live Driver Tracking

# STORY TRACK-001

## Send Driver GPS Updates

### Goal

Continuously update driver location.

### Acceptance Criteria

- Driver coordinates streamed

### Status

Todo

---

# STORY TRACK-002

## Animate Driver Marker Movement

### Goal

Simulate live movement.

### Acceptance Criteria

- Marker moves smoothly

### Status

Todo

---

# STORY TRACK-003

## Live ETA Recalculation

### Goal

Update ETA dynamically.

### Acceptance Criteria

- ETA updates in realtime

### Status

Todo

---

# EPIC 11 — Pricing System

# STORY PRICE-001

## Create Fare Estimation Engine

### Goal

Estimate ride cost.

### Acceptance Criteria

- Fare calculated

### Status

Todo

---

# STORY PRICE-002

## Display Fare Preview

### Goal

Show ride cost before booking.

### Acceptance Criteria

- Fare visible in UI

### Status

Todo

---

# EPIC 12 — Notifications

# STORY NOTIF-001

## Ride Accepted Notification

### Goal

Notify rider instantly.

### Acceptance Criteria

- Rider notified

### Status

Todo

---

# STORY NOTIF-002

## Driver Arrived Notification

### Goal

Inform rider of driver arrival.

### Acceptance Criteria

- Notification displayed

### Status

Todo

---

# MOST IMPORTANT BENEFIT

You now have:

```text id="x5v8m1"
Engineering Traceability
```

Meaning:

- what was implemented
- what is pending
- why feature exists
- how project evolved

This is EXACTLY how real engineering teams prevent chaos in large systems.
