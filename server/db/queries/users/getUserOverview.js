const { singleQuery } = require('../../baseQueries');
const { userReturnValues } = require('./constants');

// GET user overview
const getUserOverview = async ({ userId }) => {
  const queryText = `
    SELECT ${userReturnValues} from users
    WHERE id = $1
    AND email_verified = true
    AND is_deleted = false
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getUserOverview;
