/* eslint-disable no-console */
const pool = require('../connect');

// Import db functions
const { createTables, dropAllTables, printTables } = require('..');

// seed function - run via 'npm run seed'
const seed = async () => {
  //  Rebuild tables
  const t1 = Date.now();
  await dropAllTables();
  await createTables();

  // Log results and end connection
  const t2 = Date.now();
  console.log(`----Seeding complete in ${t2 - t1}ms----`);
  await printTables();
  console.log('seed ended');
  pool.end();
};

module.exports = {
  seed,
};

// Lets you call functions from node
require('make-runnable');
