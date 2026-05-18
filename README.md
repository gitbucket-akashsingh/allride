# AllRide

AllRide is a full-stack ride-sharing platform inspired by Uber.

## Tech Stack

### Frontend

- React
- Tailwind CSS
- Leaflet Maps

### Backend

- Spring Boot
- Spring Security
- JWT Authentication
- MySQL

## Features

- Authentication & Authorization
- Rider Dashboard
- Driver Dashboard
- Maps & Routing
- Real-time Ride Tracking
- WebSocket Integration

## Repository Structure

backend/
frontend/
docs/
infrastructure/

# AllRide

Enterprise-grade ride booking platform inspired by systems like Uber and Ola.

AllRide is being built as a production-oriented full-stack engineering project focused on:

- scalable backend architecture
- real-time systems
- map/routing integration
- JWT authentication & authorization
- enterprise engineering practices
- DevOps & CI/CD
- microservices evolution
- production-ready frontend architecture

---

# Project Vision

The goal of AllRide is not only to build a ride-booking application,
but also to deeply understand how real-world large-scale systems are designed, developed, deployed, and maintained.

This project is being developed using:

- real engineering workflows
- roadmap planning
- epics & stories
- branch strategies
- modular architecture
- documentation-first development

similar to how real product engineering teams operate.

---

# Current Features

## Authentication & Authorization

- JWT Authentication
- Login API
- Signup API
- Protected Routes
- Role-based access preparation
- Token persistence
- Axios interceptor

---

## Rider Features

- Rider dashboard
- Book ride UI
- Pickup & drop selection
- Route visualization
- Ride history
- Map integration

---

## Driver Features

- Driver dashboard
- Online/offline toggle
- Ride acceptance flow
- Future realtime tracking preparation

---

## Maps & Routing

- Interactive maps
- Pickup/drop markers
- Geocoding
- Route drawing
- Distance calculation
- ETA calculation
- OSRM routing integration

---

## Frontend Architecture

- React + Vite
- TailwindCSS
- Protected routing
- Shared layouts
- Reusable UI components
- Responsive navbar
- Dashboard layouts

---

## Backend Architecture

- Spring Boot
- Spring Security
- JWT Security
- REST APIs
- Layered architecture
- DTO pattern
- Service layer abstraction
- JPA/Hibernate

---

# Tech Stack

## Frontend

- React
- Vite
- TailwindCSS
- Axios
- React Router
- Leaflet Maps

---

## Backend

- Java
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- Hibernate
- Maven

---

## Database

- Postgres-DB

---

## DevOps & Infrastructure

- GitHub
- GitHub Projects
- Jenkins (planned)
- Docker (planned)
- CI/CD pipeline (planned)

---

# Monorepo Structure

```text
allride/
│
├── backend/
│   └── allride-backend/
│
├── frontend/
│   └── allride-frontend/
│
├── docs/
│
├── infrastructure/
│
├── README.md
└── .gitignore
```

---

# System Architecture

High-level architecture:

```text
React Frontend
        │
        ▼
Spring Boot REST APIs
        │
        ▼
Authentication & Business Logic
        │
        ▼
MySQL Database
```

Future evolution:

```text
Frontend
    │
API Gateway
    │
Microservices
├── Auth Service
├── Ride Service
├── Driver Service
├── Payment Service
└── Notification Service
```

---

# Screenshots

## Login Page

(Add screenshot later)

---

## Rider Dashboard

(Add screenshot later)

---

## Map & Routing

(Add screenshot later)

---

# Local Development Setup

## Backend Setup

```bash
cd backend/allride-backend

mvn clean install

mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

## Frontend Setup

```bash
cd frontend/allride-frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Environment Variables

Backend environment variables:

```env
JWT_SECRET=yourSecret
DB_URL=jdbc:mysql://localhost:3306/allride
DB_USERNAME=root
DB_PASSWORD=password
```

---

# API Documentation

Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

---

# Engineering Roadmap

## Phase 1 — MVP

- Authentication
- Ride booking
- Rider dashboard
- Driver dashboard
- Maps integration
- Route drawing

---

## Phase 2 — Realtime System

- Live driver tracking
- WebSocket integration
- Nearby drivers
- Ride lifecycle management

---

## Phase 3 — Enterprise Platform

- Feature flags
- RBAC
- Admin dashboard
- Dynamic configuration system
- Audit logging

---

## Phase 4 — Production Engineering

- Dockerization
- Jenkins CI/CD
- Monitoring
- Cloud deployment
- Microservices migration

---

# Documentation

Detailed project documentation available in:

```text
docs/
```

Includes:

- architecture
- epics
- stories
- sprint planning
- setup guides
- roadmap
- backend design
- frontend structure
- DevOps planning

---

# Engineering Goals

This project focuses heavily on learning:

- system design
- production architecture
- full-stack engineering
- backend scalability
- frontend architecture
- DevOps workflows
- enterprise development practices

---

# Future Goals

Planned future capabilities:

- Realtime ride tracking
- Payment gateway integration
- Driver matching algorithms
- Dynamic pricing
- Feature flag system
- Admin operations dashboard
- Distributed microservices
- Kubernetes deployment

---

# Repository Strategy

This repository follows a monorepo structure to maintain:

- shared documentation
- unified roadmap
- centralized project management
- coordinated frontend/backend development

---

# Branch Strategy

```text
main        → production-ready code
develop     → integration branch
feature/*   → individual features
hotfix/*    → production fixes
docs/*      → documentation updates
```

---

# Status

AllRide is currently under active development.

This project is continuously evolving toward a production-grade engineering platform.

---

# Author

Built as a deep-learning full-stack engineering project focused on understanding how real-world scalable platforms are designed and operated.
