const users = `CREATE TABLE IF NOT EXISTS
users(
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  first_name VARCHAR(128),
  last_name VARCHAR(128),
  email VARCHAR(128) NOT NULL,
  watching UUID [],
  rep SMALLINT NOT NULL DEFAULT 0,
  profile_pic VARCHAR(255),
  comments UUID [],
  attempting UUID [],
  issues UUID [],
  organizations UUID [],
  username VARCHAR(40),
  github_link VARCHAR(128),
  personal_link VARCHAR(128),
  preferred_languages VARCHAR(128) [],
  stackoverflow_link VARCHAR(128),
  is_deleted BOOLEAN DEFAULT false,
  pull_requests UUID [],
  upvotes UUID [],
  active_pull_requests SMALLINT DEFAULT 0,
  completed_pull_requests SMALLINT DEFAULT 0,
  dollars_earned FLOAT DEFAULT 0,
  is_online BOOLEAN DEFAULT true,
  rejected_pull_requests SMALLINT DEFAULT 0
)`;

module.exports = users;
