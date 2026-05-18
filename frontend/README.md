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
