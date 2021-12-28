const isEmpty = require('lodash/isEmpty');

const { CustomError, errorLogger } = require('../../../helpers');
const {
  getOneIssue,
  getOneRepo,
  getSurveyStatus,
  getUserAttemptList,
  getUserBounties,
  getUserCompany,
  getUserPullRequestDetail,
  getUserSettings: getUserSettingsQuery,
  getUserWatchList,
} = require('../../../db');
const { getUserSettingsError } = require('./constants');

const getUserSettings = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const result = await getUserSettingsQuery({ userId });
    const { issues, repos } = result || {};

    const userCompany = await getUserCompany({ userId });

    // Pull user attempting detail
    const attemptingListResult = await getUserAttemptList({ userId });

    // Pull user bounties
    const bounties = await getUserBounties({ userId });

    if (userCompany) {
      const {
        contract,
        contractAcceptedDate,
        id,
        ...companyProps
      } = userCompany;
      result.company = {
        companyId: id,
        contract,
        isContractAccepted: !!contractAcceptedDate,
        isQuestionnaireComplete: Object.keys(companyProps).some(
          prop => !!companyProps[prop],
        ),
        // TODO: confirm payment method
        paymentConfirmed: false,
      };
    }

    // Pull user issue detail
    const issuesListResult = await Promise.all(
      issues.map(async issueId => {
        const issuesResult = await getOneIssue({ issueId });
        return issuesResult;
      }),
    );

    // Pull user repo detail
    const reposListResult = await Promise.all(
      repos.map(async repoId => {
        const reposResult = await getOneRepo({ repoId });
        return reposResult;
      }),
    );

    // Pull user pull request detail
    const {
      activePullRequests,
      completedPullRequests,
      rejectedPullRequests,
    } = await getUserPullRequestDetail({ userId });

    // Pull user watching detail
    const watchingListResult = await getUserWatchList({ userId });

    // Get hiring survey status
    const surveyComplete = await getSurveyStatus({ userId });

    result.activePullRequests = activePullRequests;
    result.attempting = attemptingListResult;
    result.bounties = bounties;
    result.completedPullRequests = completedPullRequests;
    result.issues = issuesListResult;
    result.notifications = false;
    result.rejectedPullRequests = rejectedPullRequests;
    result.repos = reposListResult;
    result.surveyComplete = surveyComplete;
    result.watching = watchingListResult;

    // Show notification for unaccepted bounties
    bounties.forEach(bounty => {
      if (!bounty.userAccepted) {
        result.notifications = true;
      }
    });

    if (!isEmpty(result.skills)) {
      const skillsArray = result.skills.map(({ level, shortName }) => ({
        beginner: level === 1,
        expert: level === 3,
        intermediate: level === 2,
        skill: shortName,
      }));
      result.skills = skillsArray;
    } else {
      result.skills = [];
    }

    return {
      __typename: 'User',
      ...result,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || getUserSettingsError,
    };
  }
};

module.exports = getUserSettings;
