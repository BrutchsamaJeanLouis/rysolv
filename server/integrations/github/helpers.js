// ISSUE URL
// https://api.github.com/repos/organization/repo/issues/issueNumber
const formatIssueUrl = value => {
  const url = value.split('/');
  const issueNumber = url[url.length - 1];
  const validIssueNumber = !Number.isNaN(parseInt(issueNumber, 10) + 1);
  const validIssues = url[url.length - 2] === 'issues';
  const repo = url[url.length - 3];
  const organization = url[url.length - 4];
  const containsGithub =
    url[url.length - 5] === 'github.com' ||
    url[url.length - 5] === 'www.github.com' ||
    url[url.length - 5] === 'api.github.com';
  if (validIssueNumber && validIssues && containsGithub) {
    return {
      formattedUrl: `https://api.github.com/repos/${organization}/${repo}/issues/${issueNumber}`,
      issueNumber,
      organization,
      repo,
    };
  }
  throw new Error('Not a valid issue url');
};

// ORGANIZATION URL
// https://api.github.com/repos/organization/repo
const formatOrganizationUrl = value => {
  const url = value.split('/');

  if (url.includes('api.github.com')) {
    return {
      type: 'repo',
      organization: url[url.length - 2],
      repo: url[url.length - 1],
    };
  }

  const containsHttps = url.includes('https:');
  if (!containsHttps) {
    url.unshift('https:');
  } else {
    url.splice(1, 1);
  }

  const githubPosition = Math.max(
    url.indexOf('github.com'),
    url.indexOf('www.github.com'),
  );

  if (githubPosition > -1 && url.length >= 3 && url.length <= 5) {
    if (url.length > 3) {
      const repo = url[githubPosition + 2];
      const organization = url[githubPosition + 1];
      return {
        formattedUrl: `https://api.github.com/repos/${organization}/${repo}`,
        organization,
        repo,
        type: 'repo',
      };
    }
    const organization = url[githubPosition + 1];
    return {
      formattedUrl: `https://api.github.com/users/${organization}`,
      organization,
      type: 'organization',
    };
  }
  throw new Error('Not a valid organization url');
};

// PULL_REQUEST URL
// https://api.github.com/repos/organization/repo/pulls/pullNumber
const formatPullRequestUrl = value => {
  const url = value.split('/');
  const pullNumber = url[url.length - 1];
  const validPullNumber = !Number.isNaN(parseInt(pullNumber, 10) + 1);
  const validPull = url[url.length - 2] === 'pull';
  const repo = url[url.length - 3];
  const organization = url[url.length - 4];
  const containsGithub =
    url[url.length - 5] === 'github.com' ||
    url[url.length - 5] === 'www.github.com' ||
    url[url.length - 5] === 'api.github.com';
  if (validPullNumber && validPull && containsGithub) {
    return `https://api.github.com/repos/${organization}/${repo}/pulls/${pullNumber}`;
  }
  throw new Error('Not a valid pull request url');
};

module.exports = {
  formatIssueUrl,
  formatOrganizationUrl,
  formatPullRequestUrl,
};
