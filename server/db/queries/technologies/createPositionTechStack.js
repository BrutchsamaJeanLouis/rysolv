const { singleQuery } = require('../../baseQueries');

// Add technology to table
const createPositionTechStack = async ({ level, positionId, technology }) => {
  const values = [level, positionId, technology];
  const queryText = `
    WITH tech_id as (
      SELECT t.id FROM technologies t
      WHERE t.name = $3
    )
    INSERT INTO
    position_tech_stack(level, position_id, technology_id)
    VALUES(
      $1,
      $2,
      (SELECT id FROM tech_id)
    )
    ON CONFLICT (position_id, technology_id)
    DO UPDATE SET level = EXCLUDED.level
  `;
  await singleQuery({ queryText, values });
};

module.exports = createPositionTechStack;
