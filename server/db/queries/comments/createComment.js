const { commentValues } = require('./constants');
const { formatParamaters } = require('../../helpers');
const { singleQuery } = require('../../baseQueries');

// Create new Comments from seed
const createComment = async data => {
  const { parameters, substitution, values } = formatParamaters(
    commentValues,
    data,
  );

  const queryText = `INSERT INTO
  comments(${parameters})
  VALUES(${substitution})
  RETURNING *`;
  const { rows } = await singleQuery({ queryText, values });
  const [result] = rows;
  return result;
};

module.exports = createComment;
