# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### STEP 1 — INSTALL REACT USING VITE

Create React Application.

- Install Node.js (npm comes along with node.js)
- npm create vite@latest

### STEP 2 — INSTALL ESSENTIAL PACKAGES

Install these FIRST.

- npm install react-router-dom (Routing system)
- npm install axios (Backend API communication.)
-
- npm install -D tailwindcss @tailwindcss/vite (For Styling CSS)
-
- npm install react-hot-toast (Lightweight Notification API)
- npm install @tanstack/react-query (Production API state management.)
- npm install socket.io-client (Real-time features.)
- npm install zustand (Global state management.)
-
- npm install react-hook-form (Professional form handling + validation.)
- npm install zod (Professional form handling + validation.)

### STEP 3 — CREATE ROUTING SYSTEM

- Create File :
  src/routes/AppRoutes.jsx

## LOGIN FLOW:

First Understand The BIG Problem

Your original LoginPage.jsx was doing EVERYTHING:

Render UI
Handle inputs
Call backend
Store token
Handle login logic
Redirect users
Show notifications

This works initially.

But imagine later:

Signup page also needs login logic
Google OAuth also needs auth logic
Mobile app also needs auth logic
Auto-login on refresh
Refresh tokens
Logout everywhere
Admin panel
Protected routes

Then one giant file becomes impossible to manage.

So modern apps split responsibilities.
