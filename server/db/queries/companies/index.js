const createCompany = require('./createCompany');
const createCompanyPosition = require('./createCompanyPosition');
const deletePosition = require('./deletePosition');
const deleteUserCompanies = require('./deleteUserCompanies');
const getCompanyPositions = require('./getCompanyPositions');
const getContractByKey = require('./getContractByKey');
const getOneCompany = require('./getOneCompany');
const getOnePosition = require('./getOnePosition');
const getPositionCandidates = require('./getPositionCandidates');
const insertUserCompany = require('./insertUserCompany');
const matchCandidates = require('./matchCandidates');
const postContractAccepted = require('./postContractAccepted');
const transformCompany = require('./transformCompany');

module.exports = {
  createCompany,
  createCompanyPosition,
  deletePosition,
  deleteUserCompanies,
  getCompanyPositions,
  getContractByKey,
  getOneCompany,
  getOnePosition,
  getPositionCandidates,
  insertUserCompany,
  matchCandidates,
  postContractAccepted,
  transformCompany,
};
