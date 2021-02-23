const { v4: uuidv4 } = require('uuid');

const { singleQuery } = require('../../baseQueries');

// Add language to table
const createLanguage = async ({ languages, target }) => {
  languages.map(async language => {
    const isLanguageDefined =
      language !== '' && language !== null && language !== undefined;

    if (isLanguageDefined) {
      const values = [
        uuidv4(),
        target.issueId || null,
        language,
        target.reponId || null,
        target.userId || null,
      ];

      const queryText = `
        INSERT INTO
        languages(id, issue_id, language, repo_id, user_id)
        VALUES($1, $2, $3, $4, $5)
      `;

      await singleQuery({ queryText, values });
    }
  });
};

module.exports = createLanguage;
