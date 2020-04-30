/* eslint-disable no-param-reassign */
import { createSelector } from 'reselect';
import { extend, omit } from 'lodash';

import { filterContributors, filterIssues } from 'utils/filterHelpers';

import { initialState } from './reducer';

const selectOrganizationsDomain = state => state.organizations || initialState;

const makeSelectOrganizations = prop =>
  createSelector(
    selectOrganizationsDomain,
    substate => substate[prop],
  );

const makeSelectOrganizationsDisabled = () =>
  createSelector(
    makeSelectOrganizations('data'),
    data => {
      const tempData = omit(data, ['importUrl', 'totalFunded']);
      return Object.keys(tempData).every(item => tempData[item].value !== '');
    },
  );

const makeSelectOrganizationsEditRequest = () =>
  createSelector(
    makeSelectOrganizations('editInfo'),
    editInfo =>
      Object.keys(editInfo).reduce((acc, field) => {
        acc[field] = editInfo[field].value;
        return acc;
      }, {}),
  );

const makeSelectOrganizationsError = prop =>
  createSelector(
    makeSelectOrganizations('error'),
    error => error[prop],
  );

const makeSelectOrganizationsFormattedData = () =>
  createSelector(
    makeSelectOrganizations('organization'),
    makeSelectOrganizations('filter'),
    makeSelectOrganizations('search'),
    makeSelectOrganizations('shouldSearch'),
    (organization, filter, { contributorInput, issueInput }) => {
      const { contributors, issues, ownerId, ...restProps } = organization;
      const newIssues = extend([], issues);
      let returnObj = {};
      if (contributors) {
        const filteredContributors = filterContributors(
          contributors,
          contributorInput,
        );
        const formattedContributors = filteredContributors.map(contributor => {
          const { id } = contributor;
          // eslint-disable-next-line no-param-reassign
          contributor.isOwner = id === ownerId;
          return contributor;
        });
        returnObj = { contributors: formattedContributors, ...restProps };
      }
      if (issues) {
        const filteredIssues = filterIssues(newIssues, filter, issueInput);
        returnObj = { issues: filteredIssues, ...returnObj };
      }
      return returnObj;
    },
  );

const makeSelectOrganizationsLoading = prop =>
  createSelector(
    makeSelectOrganizations('loading'),
    loading => loading[prop],
  );

const makeSelectOrganizationsRequestBody = () =>
  createSelector(
    makeSelectOrganizations('data'),
    data =>
      Object.keys(data).reduce((acc, field) => {
        acc[field] = data[field].value;
        return acc;
      }, {}),
  );

const makeSelectOrganizationsSearchDisabled = prop =>
  createSelector(
    makeSelectOrganizations('search'),
    search => search[prop].value === '',
  );

const makeSelectOrganizationsStep = prop =>
  createSelector(
    makeSelectOrganizations('step'),
    step => step[prop],
  );

export default selectOrganizationsDomain;
export {
  makeSelectOrganizations,
  makeSelectOrganizationsDisabled,
  makeSelectOrganizationsEditRequest,
  makeSelectOrganizationsError,
  makeSelectOrganizationsFormattedData,
  makeSelectOrganizationsLoading,
  makeSelectOrganizationsRequestBody,
  makeSelectOrganizationsSearchDisabled,
  makeSelectOrganizationsStep,
};
