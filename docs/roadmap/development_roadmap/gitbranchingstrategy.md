# AllRide Git Branch Strategy

This strategy is inspired by workflows commonly used in professional engineering teams at companies like Uber and modern SaaS/product organizations.

The purpose is NOT:

```text id="m5q2v8"
“to make Git complicated”
```

The purpose is:

```text id="n8v1w4"
to safely manage evolving software systems
```

As your AllRide grows:

- frontend
- backend
- realtime
- maps
- auth
- websocket
- payments

you NEED controlled development flow.

Otherwise:

```text id="x3m7q1"
everything becomes chaotic very quickly
```

---

# HIGH-LEVEL STRATEGY

Use:

## Simplified GitFlow

Perfect for:

- solo developers
- portfolio projects
- startup-style projects
- scalable learning

---

# MAIN BRANCHES

You should maintain ONLY these permanent branches:

```text id="p7v2m5"
main
develop
```

---

# 1. main BRANCH

## Purpose

Production-ready stable code.

---

## Rules

- NEVER directly code on main
- NEVER directly push random changes
- ONLY merge tested features

---

## Represents

```text id="r9m4q2"
deployable application
```

---

# EXAMPLE

```bash id="t2q8m1"
main
```

Contains:

- stable auth
- stable maps
- stable dashboards

---

# 2. develop BRANCH

## Purpose

Primary active development branch.

---

## Represents

```text id="k6v1m9"
latest integrated working development state
```

---

## Rules

- feature branches merge into develop
- develop may be unstable temporarily
- main only receives stable tested code

---

# FLOW

```text id="c5m8q3"
feature/*
    ↓
develop
    ↓
main
```

This is VERY important.

---

# FEATURE BRANCHES

These are temporary branches.

Created for:

- features
- stories
- epics

---

# NAMING CONVENTION

Use:

```text id="w8q1m7"
feature/<feature-name>
```

---

# EXAMPLES

## Authentication

```bash id="d4v9m2"
feature/authentication
```

---

## Maps

```bash id="f2m7q8"
feature/maps-routing
```

---

## Driver System

```bash id="x9w3m1"
feature/driver-management
```

---

## WebSocket

```bash id="j1q8v4"
feature/websocket-realtime
```

---

# BENEFITS

Feature isolation:

- safer development
- easier rollback
- cleaner commits
- focused implementation

---

# BUGFIX BRANCHES

Use when fixing issues.

---

# NAMING

```text id="n6m2q5"
bugfix/<issue-name>
```

---

# EXAMPLES

```bash id="p4v7m1"
bugfix/cors-error
bugfix/navbar-layout
bugfix/jwt-expiration
```

---

# HOTFIX BRANCHES (OPTIONAL)

Used for urgent production fixes.

Usually only important later.

---

# NAMING

```text id="q8m3v2"
hotfix/<issue>
```

---

# EXAMPLE

```bash id="u5q1m9"
hotfix/payment-failure
```

---

# RELEASE BRANCHES (OPTIONAL)

Useful later when application becomes large.

---

# NAMING

```text id="r2m8q4"
release/v1.0.0
```

---

# RECOMMENDED WORKFLOW

# STEP 1 — START FEATURE

Switch to develop:

```bash id="m7q4v1"
git checkout develop
```

Pull latest:

```bash id="x1m9q3"
git pull origin develop
```

Create feature branch:

```bash id="p8v2m5"
git checkout -b feature/maps-routing
```

---

# STEP 2 — IMPLEMENT FEATURE

Code safely inside feature branch.

---

# STEP 3 — COMMIT PROPERLY

GOOD commits:

```bash id="d9m3q1"
git commit -m "feat: implement geocoding service"
```

---

# STEP 4 — PUSH FEATURE

```bash id="v4q8m2"
git push origin feature/maps-routing
```

---

# STEP 5 — MERGE INTO develop

After testing:

```bash id="n2v7m4"
git checkout develop

git merge feature/maps-routing
```

---

# STEP 6 — EVENTUALLY MERGE TO main

When stable:

```bash id="k5m1q8"
git checkout main

git merge develop
```

---

# IDEAL PROJECT STRUCTURE

Inside monorepo:

```text id="z7v3m2"
allride/
│
├── frontend/
│
├── backend/
│
├── docs/
│
├── README.md
│
├── .gitignore
│
└── docker-compose.yml
```

---

# BRANCHING BY EPIC

You can ALSO organize by epics.

---

# EXAMPLES

## Epic — Authentication

```bash id="r8m4q1"
feature/auth-system
```

---

## Epic — Maps

```bash id="t3v9m5"
feature/maps-system
```

---

## Epic — Realtime

```bash id="w1m7q2"
feature/realtime-tracking
```

---

# COMMIT MESSAGE STRATEGY

This is VERY important professionally.

---

# FORMAT

```text id="c6q2m8"
type: message
```

---

# TYPES

## feat

New feature.

```bash id="u9v3m1"
feat: add route polyline rendering
```

---

## fix

Bug fix.

```bash id="p5m8q4"
fix: resolve CORS preflight issue
```

---

## refactor

Improve structure without behavior change.

```bash id="n1q7v5"
refactor: move API logic into services layer
```

---

## style

UI/styling updates.

```bash id="h4m2q9"
style: improve navbar spacing
```

---

## docs

Documentation changes.

```bash id="x8v1m3"
docs: add sprint roadmap
```

---

## test

Testing-related changes.

```bash id="q7m5v2"
test: add auth service unit tests
```

---

# GITHUB PULL REQUEST STRATEGY

Even as solo developer:
DO THIS.

Why?

Because it trains professional workflow.

---

# PR EXAMPLE

## Title

```text id="m2q8v6"
feat: implement OSRM route rendering
```

---

## Description

```text id="r5v1m9"
- Added OSRM integration
- Added route polyline
- Added ETA calculation
- Added distance display
```

---

# WHY THIS MATTERS FOR RECRUITERS

Recruiters do NOT only inspect:

```text id="w4m9q1"
final UI
```

Good recruiters inspect:

- Git history
- architecture
- commit quality
- project organization
- engineering discipline

This branch strategy immediately makes your project feel:

```text id="k8v2m4"
far more professional
```

---

# YOUR RECOMMENDED STARTING SETUP

You should NOW create:

# PERMANENT BRANCHES

```bash id="c3m7q5"
main
develop
```

---

# CURRENT FEATURE BRANCHES

```bash id="n9v1m8"
feature/authentication
feature/ui-layout
feature/maps-routing
feature/ride-booking
```

---

# FUTURE BRANCHES

```bash id="t6m2q4"
feature/nearby-drivers
feature/websocket-realtime
feature/live-tracking
feature/payment-system
```

---

# MOST IMPORTANT BENEFIT

This transforms development from:

```text id="y1q8m3"
“editing random files”
```

into:

```text id="p7v4m2"
controlled software evolution
```

That is EXACTLY how real engineering organizations operate.
