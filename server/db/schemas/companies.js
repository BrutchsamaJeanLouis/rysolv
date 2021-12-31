const alterCompaniesTable = `
  ALTER TABLE companies
  ADD COLUMN company_name VARCHAR(64),
  ADD COLUMN company_url VARCHAR(128),
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN customer_id VARCHAR(64) UNIQUE,
  ADD COLUMN description TEXT,
  ADD COLUMN location VARCHAR(128),
  ADD COLUMN logo VARCHAR(256),
  ADD COLUMN modified_date TIMESTAMP,
  ADD COLUMN payment_method VARCHAR(128),
  ADD COLUMN payment_set_date TIMESTAMP,
  ADD COLUMN size INT
`;

const createCompaniesTable = `
  CREATE TABLE IF NOT EXISTS
  companies(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
  )
`;

module.exports = { alterCompaniesTable, createCompaniesTable };
