const {
  createActivity,
  getOrganizationActivity,
  getUserActivity,
} = require('./queries/activity');
const { toggleAttempting } = require('./queries/attempting');
const { createComment, getIssueComments } = require('./queries/comments');
const {
  checkDuplicateIssue,
  closeIssue,
  createIssue,
  downvoteIssue,
  getIssueAttemptList,
  getIssues,
  getIssueWatchList,
  getOneIssue,
  searchIssues,
  transformIssue,
  upvoteIssue,
} = require('./queries/issues');
const {
  checkDuplicateOrganization,
  createOrganization,
  getOneOrganization,
  getOrganizations,
  getOrganizationsWhere,
  searchOrganizations,
  transformOrganization,
  updateOrganizationArray,
} = require('./queries/organizations');
const {
  submitAccountDepositUser,
  submitAccountPaymentUser,
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
  checkDuplicateUserEmail,
  checkDuplicateUsername,
  checkUserGithubId,
  createUser,
  getOneUser,
  getOneUserSignUp,
  getUserAttemptList,
  getUserPullRequestDetail,
  getUsers,
  getUserWatchList,
  searchUsers,
  transformUser,
  updateUserArray,
} = require('./queries/users');
const { toggleWatching } = require('./queries/watching');
const {
  createWithdrawal,
  transformUserBalance,
} = require('./queries/withdrawal');

module.exports = {
  checkDuplicateIssue,
  checkDuplicateOrganization,
  checkDuplicatePullRequest,
  checkDuplicateUserEmail,
  checkDuplicateUsername,
  checkUserGithubId,
  closeIssue,
  createActivity,
  createComment,
  createIssue,
  createOrganization,
  createPullRequest,
  createUser,
  createWithdrawal,
  deletePullRequest,
  deleteUserPullRequests,
  downvoteIssue,
  getIssueAttemptList,
  getIssueComments,
  getIssues,
  getIssueWatchList,
  getOneIssue,
  getOneOrganization,
  getOneUser,
  getOneUserSignUp,
  getOrganizationActivity,
  getOrganizations,
  getOrganizationsWhere,
  getPullRequestList,
  getUserActivity,
  getUserAttemptList,
  getUserPullRequestDetail,
  getUserPullRequests,
  getUsers,
  getUserWatchList,
  searchIssues,
  searchOrganizations,
  searchUsers,
  submitAccountDepositUser,
  submitAccountPaymentUser,
  submitExternalPayment,
  submitInternalPayment,
  toggleAttempting,
  toggleWatching,
  transformIssue,
  transformOrganization,
  transformUser,
  transformUserBalance,
  updateOrganizationArray,
  updateUserArray,
  upvoteIssue,
};
