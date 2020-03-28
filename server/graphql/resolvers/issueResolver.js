const { v4: uuidv4 } = require('uuid');
const {
  createIssue,
  getIssues,
  getOneIssue,
  deleteIssue,
  transformIssue,
} = require('../../db');

module.exports = {
  getIssues: async () => {
    try {
      const issues = await getIssues('issues');
      return issues;
    } catch (err) {
      throw err;
    }
  },
  oneIssue: async args => {
    const { id } = args;
    try {
      const [result] = await getOneIssue('issues', id);
      return result;
    } catch (err) {
      throw err;
    }
  },
  createIssue: async args => {
    const { issueInput } = args;
    const issue = [
      [
        uuidv4(),
        new Date(),
        new Date(),
        issueInput.organization,
        issueInput.name,
        issueInput.body,
        issueInput.repo,
        issueInput.language,
        issueInput.comments || [],
        issueInput.attempts || 0,
        issueInput.active_attempts || 0,
        issueInput.contributor,
      ],
    ];
    try {
      const result = await createIssue(issue);
      return result;
    } catch (err) {
      throw err;
    }
  },
  transformIssue: async args => {
    const { id, issueInput } = args;
    try {
      const data = [
        [
          new Date(), // update modified date
          issueInput.organization,
          issueInput.name,
          issueInput.body,
          issueInput.repo,
          issueInput.language,
          issueInput.comments || [],
          issueInput.attempts || 0,
          issueInput.active_attempts || 0,
          issueInput.contributor,
        ],
      ];
      const issues = await transformIssue('issues', id, data);
      return issues;
    } catch (err) {
      throw err;
    }
  },
  deleteIssue: async args => {
    const { id } = args;
    try {
      const issues = await deleteIssue('issues', id);
      return issues;
    } catch (err) {
      throw err;
    }
  },
};
