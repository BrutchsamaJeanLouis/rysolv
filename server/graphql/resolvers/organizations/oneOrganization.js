const { errorLogger } = require('../../../helpers');
const {
  getOneIssue,
  getOneOrganization,
  getOrganizationContributors,
} = require('../../../db');
const { oneOrganizationError } = require('./constants');

const oneOrganization = async ({ id }) => {
  try {
    const result = await getOneOrganization({ organizationId: id });
    const { issues } = result;

    const contributorsResult = await getOrganizationContributors({
      organizationId: id,
    });
    result.contributors = contributorsResult;

    const issuesResult = await Promise.all(
      issues.map(async issueId => {
        const issueResult = await getOneIssue({ issueId });
        return issueResult;
      }),
    );
    result.issues = issuesResult;
    return {
      __typename: 'Organization',
      ...result,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: oneOrganizationError,
    };
  }
};

module.exports = oneOrganization;
