const { singleQuery } = require('../../baseQueries');

// ADD to array
const updateOrganizationArray = async (column, id, data, remove) => {
  const action = remove ? 'array_remove' : 'array_append';
  const queryText = `UPDATE organizations
    SET ${column} = ${action}(${column}, '${data}')
    WHERE (id = '${id}')
    RETURNING *`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = updateOrganizationArray;
