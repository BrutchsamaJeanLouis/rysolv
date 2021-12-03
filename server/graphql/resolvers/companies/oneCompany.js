/* eslint-disable camelcase */
const { CustomError, errorLogger } = require('../../../helpers');
const { generateSizeString } = require('../../../helpers');
const { getOneCompany } = require('../../../db');
const { oneCompanyError } = require('./constants');

const oneCompany = async ({ companyId }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const companyData = await getOneCompany({ companyId });
    const { size } = companyData;
    const formattedSize = generateSizeString({ size });
    return {
      __typename: 'Company',
      ...companyData,
      size: formattedSize,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || oneCompanyError,
    };
  }
};

module.exports = oneCompany;