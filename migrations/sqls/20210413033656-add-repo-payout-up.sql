ALTER TABLE repos
ADD COLUMN IF NOT EXISTS is_edited BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS payout_url VARCHAR(128),
DROP COLUMN IF EXISTS verified;

