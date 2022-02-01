const { singleQuery } = require('../../baseQueries');

const saveCandidate = async ({ candidateId, positionId }) => {
  const queryText = `
    UPDATE candidate_positions
    SET saved_date = CASE WHEN saved_date IS NOT NULL THEN NULL ELSE now() END
    WHERE user_id = $1
    AND position_id = $2
  `;

  await singleQuery({
    queryText,
    values: [candidateId, positionId],
  });
};

module.exports = saveCandidate;
