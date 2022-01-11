const { singleQuery } = require('../../baseQueries');

const getUserResponse = async ({ userId }) => {
  const queryText = `
    WITH skills AS (
      SELECT COALESCE(array_agg(json_build_object('id', pts.id, 'level', pts.level, 'name', t.name)), '{}') AS skills
      FROM position_tech_stack pts
      JOIN technologies t ON pts.technology_id = t.id
      WHERE pts.user_id = $1
    ), userData AS (
      SELECT json_object_agg(
        q.question_key,  COALESCE(uqr.value, qr.value)
      ) AS "userData"
      FROM user_question_responses uqr
      JOIN question_responses qr ON qr.id = uqr.response_id
      JOIN questions q ON q.id = uqr.question_id
      WHERE q.category = 'hiring'
      AND uqr.user_id = $1
    )
    SELECT
      (SELECT * FROM userData),
      (SELECT * FROM skills)
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getUserResponse;
