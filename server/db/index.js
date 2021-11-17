const {
  createActivity,
  getRepoActivity,
  getUserActivity,
} = require('./queries/activity');
const { removeAttempting, toggleAttempting } = require('./queries/attempting');
const { acceptBounty, verifyPayout } = require('./queries/bounties');
const { createComment, getIssueComments } = require('./queries/comments');
const {
  createCompany,
  createCompanyPosition,
  createMessage,
  deletePosition,
  deleteUserCompanies,
  getCompanyPositions,
  getOneCompany,
  getOnePosition,
  getPositionCandidates,
  insertUserCompany,
  postContractAccepted,
  transformCompany,
} = require('./queries/companies');
const {
  checkDuplicateIssue,
  closeIssue,
  createIssue,
  downvoteIssue,
  getFilteredIssues,
  getFilterOptions,
  getIssueAttemptList,
  getIssueList,
  getIssues,
  getIssueWatchList,
  getOneIssue,
  getRecommendedIssues,
  searchIssues,
  transformIssue,
  upvoteIssue,
} = require('./queries/issues');
const {
  createLanguage,
  deleteUserLanguages,
  getUserLanguages,
  setPreferredLanguage,
} = require('./queries/languages');
const {
  submitAccountDepositUser,
  submitExternalPayment,
  submitInternalPayment,
} = require('./queries/payments');
const {
  checkDuplicatePullRequest,
  createPullRequest,
  deletePullRequest,
  deleteUserPullRequests,
  getPullRequestList,
  getUserPullRequests,
} = require('./queries/pullRequests');
const {
  answerQuestionByKey,
  getQuestions,
  getSurveyStatus,
  getQuestionAnswerByKey,
  postUserResponse,
} = require('./queries/questions');
const { createRecruiting } = require('./queries/recruiting');
const {
  checkDuplicateRepo,
  createRepo,
  getOneRepo,
  getRepoContributors,
  getRepoList,
  getRepos,
  getReposWhere,
  searchRepos,
  transformRepo,
  updateRepoArray,
} = require('./queries/repos');
const {
  createPositionTechStack,
  deletePositionTechStack,
  getOneTechnology,
  getTechnologies,
} = require('./queries/technologies');
const { getStats } = require('./queries/stats');
const { addRepoMembers, deleteRepoMembers } = require('./queries/userRepos');
const {
  assignOwnerToRepo,
  checkDuplicateGithubId,
  checkDuplicateUserEmail,
  checkExistingGithubAccount,
  checkGithubIdMatch,
  createUser,
  getOneUser,
  getOneUserSignUp,
  getUserAttemptList,
  getUserBounties,
  getUserByUsername,
  getUserCompany,
  getUserPullRequestDetail,
  getUsers,
  getUserSettings,
  getUserWatchList,
  insertGitUser,
  insertUserEmail,
  searchUsers,
  transformUser,
} = require('./queries/users');
const { removeWatching, toggleWatching } = require('./queries/watching');
const {
  createWithdrawal,
  transformUserBalance,
} = require('./queries/withdrawal');

module.exports = {
  acceptBounty,
  addRepoMembers,
  answerQuestionByKey,
  assignOwnerToRepo,
  checkDuplicateGithubId,
  checkDuplicateIssue,
  checkDuplicatePullRequest,
  checkDuplicateRepo,
  checkDuplicateUserEmail,
  checkExistingGithubAccount,
  checkGithubIdMatch,
  closeIssue,
  createActivity,
  createComment,
  createCompany,
  createCompanyPosition,
  createIssue,
  createLanguage,
  createMessage,
  createPositionTechStack,
  createPullRequest,
  createRecruiting,
  createRepo,
  createUser,
  createWithdrawal,
  deletePosition,
  deletePositionTechStack,
  deletePullRequest,
  deleteRepoMembers,
  deleteUserCompanies,
  deleteUserLanguages,
  deleteUserPullRequests,
  downvoteIssue,
  getCompanyPositions,
  getFilteredIssues,
  getFilterOptions,
  getIssueAttemptList,
  getIssueComments,
  getIssueList,
  getIssues,
  getIssueWatchList,
  getOneCompany,
  getOneIssue,
  getOnePosition,
  getOneRepo,
  getOneTechnology,
  getOneUser,
  getOneUserSignUp,
  getPositionCandidates,
  getPullRequestList,
  getQuestionAnswerByKey,
  getQuestions,
  getRecommendedIssues,
  getRepoActivity,
  getRepoContributors,
  getRepoList,
  getRepos,
  getReposWhere,
  getStats,
  getSurveyStatus,
  getTechnologies,
  getUserActivity,
  getUserAttemptList,
  getUserBounties,
  getUserByUsername,
  getUserCompany,
  getUserLanguages,
  getUserPullRequestDetail,
  getUserPullRequests,
  getUsers,
  getUserSettings,
  getUserWatchList,
  insertGitUser,
  insertUserCompany,
  insertUserEmail,
  postContractAccepted,
  postUserResponse,
  removeAttempting,
  removeWatching,
  searchIssues,
  searchRepos,
  searchUsers,
  setPreferredLanguage,
  submitAccountDepositUser,
  submitExternalPayment,
  submitInternalPayment,
  toggleAttempting,
  toggleWatching,
  transformCompany,
  transformIssue,
  transformRepo,
  transformUser,
  transformUserBalance,
  updateRepoArray,
  upvoteIssue,
  verifyPayout,
};
