const comments = `CREATE TABLE IF NOT EXISTS
comments(
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  target UUID NOT NULL,
  body TEXT NOT NULL,
  user_id UUID REFERENCES users(id)
)`;

module.exports = comments;
