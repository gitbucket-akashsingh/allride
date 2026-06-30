-- AllRide baseline schema (matches JPA entities as of Flyway adoption)
-- Used on fresh databases only. Existing DBs are baselined at V1 without running this script.

CREATE TABLE users (
    id                 BIGSERIAL PRIMARY KEY,
    full_name          VARCHAR(255) NOT NULL,
    email              VARCHAR(255) NOT NULL UNIQUE,
    phone              VARCHAR(255) NOT NULL UNIQUE,
    password           VARCHAR(255) NOT NULL,
    role               VARCHAR(255) NOT NULL,
    email_verified     BOOLEAN NOT NULL DEFAULT FALSE,
    email_verified_at  TIMESTAMP
);

CREATE TABLE drivers (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT NOT NULL UNIQUE REFERENCES users (id),
    license_number  VARCHAR(255) NOT NULL UNIQUE,
    online          BOOLEAN NOT NULL,
    approved        BOOLEAN NOT NULL,
    latitude        DOUBLE PRECISION,
    longitude       DOUBLE PRECISION,
    vehicle_make    VARCHAR(255),
    vehicle_model   VARCHAR(255),
    vehicle_plate   VARCHAR(255),
    vehicle_color   VARCHAR(255),
    vehicle_type    VARCHAR(255),
    rating          DOUBLE PRECISION,
    total_trips     INTEGER
);

CREATE TABLE user_sessions (
    id           BIGSERIAL PRIMARY KEY,
    device_name  VARCHAR(255),
    ip_address   VARCHAR(255),
    user_agent   TEXT,
    created_at   TIMESTAMP,
    last_used_at TIMESTAMP,
    revoked      BOOLEAN NOT NULL DEFAULT FALSE,
    user_id      BIGINT REFERENCES users (id)
);

CREATE TABLE refresh_token (
    id          BIGSERIAL PRIMARY KEY,
    token       VARCHAR(1000) UNIQUE,
    expiry_date TIMESTAMP,
    revoked     BOOLEAN NOT NULL,
    user_id     BIGINT REFERENCES users (id),
    session_id  BIGINT REFERENCES user_sessions (id)
);

CREATE TABLE email_verification_otps (
    id            BIGSERIAL PRIMARY KEY,
    user_id       BIGINT NOT NULL REFERENCES users (id),
    otp_hash      VARCHAR(100) NOT NULL,
    expires_at    TIMESTAMP NOT NULL,
    attempt_count INTEGER NOT NULL DEFAULT 0,
    used          BOOLEAN NOT NULL DEFAULT FALSE,
    created_at    TIMESTAMP NOT NULL
);

CREATE INDEX idx_otp_user_created ON email_verification_otps (user_id, created_at);

CREATE TABLE rides (
    id                BIGSERIAL PRIMARY KEY,
    pickup_latitude   DOUBLE PRECISION,
    pickup_longitude  DOUBLE PRECISION,
    pickup_address    VARCHAR(255),
    drop_latitude     DOUBLE PRECISION,
    drop_longitude    DOUBLE PRECISION,
    drop_address      VARCHAR(255),
    fare              DOUBLE PRECISION,
    status            VARCHAR(255),
    requested_at      TIMESTAMP,
    started_at        TIMESTAMP,
    completed_at      TIMESTAMP,
    rider_id          BIGINT,
    driver_id         BIGINT
);