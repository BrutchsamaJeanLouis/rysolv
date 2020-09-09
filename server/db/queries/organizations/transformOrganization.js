const { formatParameters } = require('../../helpers');
const { organizationReturnValues, organizationValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// TRANSFORM single Organization
const transformOrganization = async ({ data, organizationId }) => {
  try {
    const { parameters, substitution, values } = formatParameters({
      newObject: data,
      tableParameters: organizationValues,
    });
    const queryText = `
      UPDATE organizations
      SET (${parameters})
      = (${substitution})
      WHERE id = '${organizationId}'
      RETURNING ${organizationReturnValues}`;
    const { rows } = await singleQuery({ queryText, values });
    const [oneRow] = rows;
    return oneRow;
  } catch (error) {
    throw new Error(`Failed to update issue.`);
  }
};

module.exports = transformOrganization;
