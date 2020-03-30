/* eslint-disable camelcase */
const {
  mapValues,
  singleItem,
  singleQuery,
  singleSearch,
} = require('../db/query');
const { diff } = require('./helpers');

// GET all users
const getUsers = async table => {
  const queryText = `SELECT
      id,
      created_date AS "createdDate",
      modified_date AS "modifiedDate",
      first_name AS "firstName",
      last_name AS "lastName",
      email,
      watching_list AS "watchingList",
      rep,
      profile_pic AS "profilePic",
      active_number AS "activeNumber",
      issues_number AS "issuesNumber",
      username
    FROM ${table};`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// GET single user
const getOneUser = async (table, id) => {
  const values = `id, created_date AS "createdDate", modified_date AS "modifiedDate", first_name AS "firstName",
  last_name AS "lastName", email, watching_list AS "watchingList", rep, profile_pic AS "profilePic",
  active_number AS "activeNumber", issues_number AS "issuesNumber", username`;
  const rows = await singleItem(table, id, values);
  if (rows.length > 0) {
    return rows;
  }
  throw new Error(`ID not found in ${table}`);
};

// Create new User
const createUser = async data => {
  const queryText = `INSERT INTO
    users(
      id,
      created_date,
      modified_date,
      first_name,
      last_name,
      email,
      watching_list,
      rep,
      profile_pic,
      active_number,
      issues_number,
      username,
      github_link,
      personal_link,
      preferred_languages,
      stackoverflow_link
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    returning *`;
  const result = await mapValues(queryText, data);
  return result;
};

// SEARCH users
const searchUsers = async (table, value) => {
  const values = `id, created_date AS "createdDate", modified_date AS "modifiedDate", first_name AS "firstName",
  last_name AS "lastName", email, watching_list AS "watchingList", rep, profile_pic AS "profilePic",
  active_number AS "activeNumber", issues_number AS "issuesNumber", username`;
  const rows = await singleSearch(table, value, values);
  return rows;
};

// PATCH single user
const transformUser = async (table, id, data) => {
  const values = `
    modified_date,
    first_name,
    last_name,
    email,
    watching_list,
    rep,
    profile_pic,
    active_number,
    issues_number,
    username`;
  const [rows] = await singleItem(table, id, values);
  if (rows) {
    console.log('user query', data);
    console.log('sql data', rows);
    const { newObjectArray } = diff(rows, data);

    console.log('newObject', newObjectArray);

    const queryText = `UPDATE ${table}
      SET (${values})
      = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      WHERE (id = '${id}')
      RETURNING *`;
    const result = await mapValues(queryText, [newObjectArray]);
    return result;
  }
  throw new Error(`Failed to update users. ID not found in ${table}`);
};

// DELETE single user
const deleteUser = async (table, id) => {
  const values = '*';
  const rows = await singleItem(table, id, values);
  if (rows.length > 0) {
    const queryText = `DELETE FROM ${table} WHERE (id='${id}') RETURNING *`;
    const {
      rows: [resultRow],
    } = await singleQuery(queryText);
    const { first_name, last_name } = resultRow;
    return `${first_name} ${last_name} was successfully deleted from ${table}.`;
  }
  throw new Error(`Failed to delete user. ID not found in ${table}`);
};

module.exports = {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  searchUsers,
  singleSearch,
  transformUser,
};
