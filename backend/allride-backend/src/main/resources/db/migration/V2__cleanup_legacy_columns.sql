-- Align existing databases that were created with ddl-auto=update
-- Idempotent: safe to run even if columns/tables are already correct

-- users: email verification (may be missing on older schemas)
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMP;

-- OTP table (may not exist on older prod)
CREATE TABLE IF NOT EXISTS email_verification_otps (
    id            BIGSERIAL PRIMARY KEY,
    user_id       BIGINT NOT NULL REFERENCES users (id),
    otp_hash      VARCHAR(100) NOT NULL,
    expires_at    TIMESTAMP NOT NULL,
    attempt_count INTEGER NOT NULL DEFAULT 0,
    used          BOOLEAN NOT NULL DEFAULT FALSE,
    created_at    TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_otp_user_created
    ON email_verification_otps (user_id, created_at);

-- drivers: legacy column from old isOnline field
ALTER TABLE drivers DROP COLUMN IF EXISTS is_online;

ALTER TABLE drivers
    ADD COLUMN IF NOT EXISTS online BOOLEAN NOT NULL DEFAULT FALSE;

-- rides: legacy renames / removed fields
ALTER TABLE rides DROP COLUMN IF EXISTS passenger_id;
ALTER TABLE rides DROP COLUMN IF EXISTS is_online;
ALTER TABLE rides DROP COLUMN IF EXISTS latitude;
ALTER TABLE rides DROP COLUMN IF EXISTS longitude;

ALTER TABLE rides
    ADD COLUMN IF NOT EXISTS rider_id BIGINT;