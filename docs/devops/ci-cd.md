The backend-ci job executes according to two distinct sets of rules:

* For feature/** branches: It runs only on push events. It completely ignores pull requests since feature/** isn't listed under the pull_request.branches block.
* For dev and main branches: It runs on both push events (including when a PR is merged) and pull_request events (when a PR is opened or updated targeting them).

## How the Full Pipeline Behaves in Practice
To visualize the workflow, here is exactly what happens during each stage of your development cycle:
## 1. Working on a Feature Branch (push to feature/my-ui)

* backend-ci: Runs (Tests and builds the JAR to ensure code doesn't break).
* deploy-dev: Skipped (The if condition matching refs/heads/dev fails).
* deploy-prod: Skipped (The if condition matching refs/heads/main fails).
* Result: Only CI runs. 

## 2. Opening a PR from Feature to Dev (pull_request targeting dev)

* backend-ci: Runs (Validates that the combined code passes tests before merging).
* deploy-dev: Skipped (The if condition fails because github.event_name is pull_request, not push).
* deploy-prod: Skipped.
* Result: Only CI runs to green-light the PR.

## 3. Merging the PR into Dev (Triggers a push event on dev)

* backend-ci: Runs (Final verification of code on the main development branch).
* deploy-dev: Runs (Passes the condition github.ref == 'refs/heads/dev' && github.event_name == 'push'). It builds the Docker image, pushes it to Docker Hub, and updates your Dev EC2 server.
* deploy-prod: Skipped.
* Result: CI runs, then automatically deploys to Dev.

## 4. Merging Dev into Main (Triggers a push event on main)

* backend-ci: Runs.
* deploy-dev: Skipped.
* deploy-prod: Runs (Passes the condition github.ref == 'refs/heads/main' && github.event_name == 'push'). It builds the final release image, pushes it, and updates your Production EC2 server.
* Result: CI runs, then automatically deploys to Production. 


#

# Backend CI/CD Pipeline

This file contains the configuration for our automated build and deployment pipeline.

```yaml
name: Backend Full CI/CD

on:
  push:
    branches:
      - 'feature/**'
      - dev
      - main
    paths:
      - "backend/allride-backend/**"
      - ".github/workflows/**"

  pull_request:
    branches:
      - main
      - dev
    paths:
      - "backend/allride-backend/**"
      - ".github/workflows/**"

jobs:
  backend-ci:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:17
        env:
          POSTGRES_DB: \${{ secrets.POSTGRES_DB }}
          POSTGRES_USER: \${{ secrets.POSTGRES_USER }}
          POSTGRES_PASSWORD: \${{ secrets.POSTGRES_PASSWORD }}
        ports:
          - 5432:5432
        options: >-
          --health-cmd="pg_isready -U postgres"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=5

    defaults:
      run:
        working-directory: backend/allride-backend

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Java 21
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 21
          cache: maven

      - name: Make Maven Wrapper Executable
        run: chmod +x mvnw

      - name: Run Tests
        run: ./mvnw test

      - name: Build Application
        run: ./mvnw clean package -DskipTests

      - name: Upload Build Artifact
        uses: actions/upload-artifact@v4
        with:
          name: backend-jar
          path: backend/allride-backend/target/*.jar
          retention-days: 1

  deploy-dev:
    needs: backend-ci
    if: github.ref == 'refs/heads/dev' && github.event_name == 'push'
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Download Build Artifact
        uses: actions/download-artifact@v4
        with:
          name: backend-jar
          path: backend/allride-backend/target/

      - name: Login To Docker Hub
        uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build Docker Image
        run: |
          docker build \
            -t \({{ secrets.DOCKERHUB_USERNAME }}/allride-backend:\){{ github.sha }} \
            -t \${{ secrets.DOCKERHUB_USERNAME }}/allride-backend:dev-latest \
            backend/allride-backend/

      - name: Push Docker Images
        run: |
          docker push \({{ secrets.DOCKERHUB_USERNAME }}/allride-backend:\){{ github.sha }}
          docker push \${{ secrets.DOCKERHUB_USERNAME }}/allride-backend:dev-latest

      - name: Deploy To EC2 (Dev)
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: \${{ secrets.EC2_HOST_DEV }}
          username: \${{ secrets.EC2_USER_DEV }}
          key: \${{ secrets.EC2_SSH_KEY_DEV }}
          script: |
            cd /home/ubuntu/allride
            docker compose pull
            docker compose up -d
            docker image prune -f

  deploy-prod:
    needs: backend-ci
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    environment:
      name: Production_ENV

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Download Build Artifact
        uses: actions/download-artifact@v4
        with:
          name: backend-jar
          path: backend/allride-backend/target/

      - name: Login To Docker Hub
        uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build Docker Image
        run: |
          docker build \
            -t \({{ secrets.DOCKERHUB_USERNAME }}/allride-backend:\){{ github.sha }} \
            -t \${{ secrets.DOCKERHUB_USERNAME }}/allride-backend:latest \
            backend/allride-backend/

      - name: Push Docker Images
        run: |
          docker push \({{ secrets.DOCKERHUB_USERNAME }}/allride-backend:\){{ github.sha }}
          docker push \${{ secrets.DOCKERHUB_USERNAME }}/allride-backend:latest

      - name: Deploy To EC2 (Prod)
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: \${{ secrets.EC2_HOST_PROD }}
          username: \${{ secrets.EC2_USER_PROD }}
          key: \${{ secrets.EC2_SSH_KEY_PROD }}
          script: |
            cd /home/ubuntu/allride
            docker compose pull
            docker compose up -d
            docker image prune -f
```
