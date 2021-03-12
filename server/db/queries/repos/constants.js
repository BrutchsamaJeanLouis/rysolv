const repoValues = [
  'created_date',
  'description',
  'id',
  'is_manual',
  'issues',
  'logo',
  'modified_date',
  'name',
  'organization_url',
  'owner_id',
  'repo_url',
  'verified',
];

const repoReturnValues = `
  repos.created_date AS "createdDate",
  repos.description,
  repos.id,
  repos.is_manual AS "isManual",
  repos.issues,
  repos.logo,
  repos.modified_date AS "modifiedDate",
  repos.name,
  repos.organization_url AS "organizationUrl",
  repos.owner_id AS "ownerId",
  repos.repo_url AS "repoUrl",
  repos.verified
`;

const groupValues = `
  repos.created_date,
  repos.description,
  repos.id,
  repos.is_deleted,
  repos.is_manual,
  repos.issues,
  repos.logo,
  repos.modified_date,
  repos.name,
  repos.organization_url,
  repos.owner_id,
  repos.repo_url,
  repos.verified
`;

module.exports = { groupValues, repoReturnValues, repoValues };
