const alterOrganizationsTable = `ALTER TABLE organizations
ADD COLUMN contributors UUID [],
ADD COLUMN created_date TIMESTAMP,
ADD COLUMN description VARCHAR(512) NOT NULL,
ADD COLUMN is_manual BOOLEAN,
ADD COLUMN issues UUID [],
ADD COLUMN logo VARCHAR(256),
ADD COLUMN modified_date TIMESTAMP,
ADD COLUMN name VARCHAR(128) NOT NULL,
ADD COLUMN organization_url VARCHAR(128),
ADD COLUMN owner_id UUID,
ADD COLUMN preferred_languages VARCHAR(128) [],
ADD COLUMN repo_url VARCHAR(128) NOT NULL,
ADD COLUMN total_funded FLOAT DEFAULT 0,
ADD COLUMN verified BOOLEAN DEFAULT false`;

const createOrganizationsTable = `CREATE TABLE IF NOT EXISTS
organizations(
  id UUID PRIMARY KEY
)`;

module.exports = { alterOrganizationsTable, createOrganizationsTable };
