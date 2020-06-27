/* eslint-disable camelcase */
const { FETCH } = require('../helpers');
const {
  formatIssueUrl,
  formatOrganizationUrl,
  formatPullRequestUrl,
} = require('./helpers');

const getSingleIssue = async issueUrl => {
  try {
    const formattedUrl = formatIssueUrl(issueUrl);
    const issueData = await FETCH(formattedUrl);
    const { html_url, title, state, body, repository_url } = issueData;

    if (state !== 'open') {
      throw new Error('Cannot add closed issue');
    }

    const issueInput = {
      issueBody: body,
      issueName: title,
      issueUrl: html_url,
      organizationUrl: repository_url,
    };

    return { issueInput };
  } catch (err) {
    throw err;
  }
};

const getSingleRepo = async organizationUrl => {
  try {
    const { type, formattedUrl } = formatOrganizationUrl(organizationUrl);

    if (type === 'organization') {
      return await getSingleOrganization(formattedUrl);
    }

    const organizationData = await FETCH(formattedUrl);

    const {
      description,
      homepage,
      html_url,
      language,
      name,
      organization,
    } = organizationData;

    const organizationInput = {
      issueLanguages: [language],
      organizationDescription: description,
      organizationName: name,
      organizationRepo: html_url,
      organizationUrl: homepage,
      organizationLanguages: [language],
      organizationLogo:
        'https://rysolv.s3.us-east-2.amazonaws.com/defaultOrg.png',
    };

    if (organization) {
      // If repo has parent organization - pull data from parent
      const parentOrganization = await FETCH(organization.url);
      const {
        name: parentName,
        avatar_url,
        html_url: parentRepo,
        blog,
        bio,
      } = parentOrganization;

      organizationInput.organizationName = parentName;
      organizationInput.organizationLogo = avatar_url;
      organizationInput.organizationRepo = parentRepo;
      organizationInput.organizationUrl = blog;
      if (bio) organizationInput.organizationDescription = bio;
    }

    return { organizationInput };
  } catch (err) {
    throw err;
  }
};

const getSingleOrganization = async value => {
  const organizationData = await FETCH(value);
  const {
    avatar_url,
    bio,
    blog,
    html_url,
    name,
    type,
    login,
  } = organizationData;
  if (type === 'User') {
    throw new Error('Cannot import user account as organization');
  }
  const organizationInput = {
    organizationDescription: bio || '',
    organizationName: name || login,
    organizationRepo: html_url,
    organizationUrl: blog,
    organizationLanguages: [],
    organizationLogo: avatar_url,
  };

  return { organizationInput };
};

const getSinglePullRequest = async pullRequestUrl => {
  const formattedUrl = formatPullRequestUrl(pullRequestUrl);
  const pullRequestData = await FETCH(formattedUrl);

  const {
    html_url,
    mergeable_state,
    mergeable,
    merged,
    number,
    state,
    title,
    url: api_url,
    user: { login },
  } = pullRequestData;

  if (state !== 'open') {
    throw new Error('This pullrequest is not open');
  }
  if (merged) {
    throw new Error('Pull request has already been merged');
  }

  const pullData = {
    apiUrl: api_url,
    githubUsername: login,
    htmlUrl: html_url,
    mergeable: !!mergeable,
    mergeableState: mergeable_state,
    merged: !!merged,
    open: state === 'open',
    pullNumber: number,
    status: state,
    title,
  };
  return pullData;
};

module.exports = {
  getSingleIssue,
  getSingleOrganization,
  getSinglePullRequest,
  getSingleRepo,
};
