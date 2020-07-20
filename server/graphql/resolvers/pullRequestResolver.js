const { v4: uuidv4 } = require('uuid');
const {
  checkDuplicatePullRequest,
  createPullRequest,
  getOneIssue,
  getOnePullRequest,
  getPullRequests,
  getUserPullRequests,
  updateIssueArray,
  updateUserArray,
} = require('../../db');

const { getSinglePullRequest } = require('../../integrations');
const { formatPullRequestUrl } = require('../../integrations/github/helpers');

module.exports = {
  createPullRequest: async args => {
    const { pullRequestInput } = args;
    const newPullRequest = {
      created_date: new Date(),
      github_username: pullRequestInput.githubUsername,
      html_url: pullRequestInput.htmlUrl,
      issue_id: pullRequestInput.issueId,
      mergeable_state: pullRequestInput.mergeableState,
      mergeable: pullRequestInput.mergeable,
      merged: pullRequestInput.merged,
      modified_date: new Date(),
      open: pullRequestInput.open,
      pull_number: pullRequestInput.pullNumber,
      pullrequest_id: uuidv4(),
      status: pullRequestInput.status,
      title: pullRequestInput.title,
      user_id: pullRequestInput.userId,
    };
    try {
      if (await checkDuplicatePullRequest(newPullRequest.html_url)) {
        throw new Error(
          `Pull request at ${newPullRequest.html_url} already exists`,
        );
      }
      const result = await createPullRequest(newPullRequest);

      // add issue to user issue list
      await updateUserArray({
        column: 'pull_requests',
        data: result.pullRequestId,
        userId: result.userId,
      });

      await updateIssueArray({
        column: 'pull_requests',
        data: result.pullRequestId,
        issueId: result.issueId,
      });

      return {
        __typename: 'PullRequest',
        ...result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  importPullRequest: async args => {
    const { url, issueId } = args;
    try {
      const { organization, repo, pullNumber } = formatPullRequestUrl(url);
      const [{ repo: issueRepo }] = await getOneIssue(issueId);

      // TODO: add org_displayname to issues schema to avoid this url parsing
      const { pathname } = new URL(issueRepo);
      const issueUrl = pathname.split('/');

      // Check PR organization against issue organization
      if (issueUrl[1] !== organization && issueUrl[2] !== repo) {
        throw new Error('Pull request does not match issue repo');
      }

      const result = await getSinglePullRequest({
        organization,
        repo,
        pullNumber,
      });

      if (await checkDuplicatePullRequest(result.htmlUrl)) {
        throw new Error(
          `Pull request at ${result.htmlUrl} has already been submitted`,
        );
      }

      return {
        __typename: 'ImportPullRequest',
        ...result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  getPullRequests: async () => {
    try {
      const result = await getPullRequests();
      return {
        __typename: 'PullRequestArray',
        pullRequestArray: result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  onePullRequest: async args => {
    const { id } = args;
    try {
      const [result] = await getOnePullRequest(id);
      return {
        __typename: 'PullRequest',
        ...result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  getUserPullRequests: async args => {
    const { id } = args;
    try {
      const result = await getUserPullRequests(id);
      const formattedResult = await Promise.all(
        result.map(async pullRequest => {
          const { issueId } = pullRequest;
          const [{ fundedAmount }] = await getOneIssue(issueId);
          // eslint-disable-next-line no-param-reassign
          pullRequest.fundedAmount = fundedAmount;
          return pullRequest;
        }),
      );
      return {
        __typename: 'PullRequestArray',
        pullRequestArray: formattedResult,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
};
