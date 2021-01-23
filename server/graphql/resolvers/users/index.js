const createUser = require('./createUser');
const deleteUser = require('./deleteUser');
const getUserIssues = require('./getUserIssues');
const getUserRepos = require('./getUserRepos');
const getUsers = require('./getUsers');
const getUserSettings = require('./getUserSettings');
const githubSignIn = require('./githubSignIn');
const oneUser = require('./oneUser');
const oneUserSignUp = require('./oneUserSignUp');
const searchUsers = require('./searchUsers');
const signIn = require('./signIn');
const signOut = require('./signOut');
const transformUser = require('./transformUser');
const verifyUserAccount = require('./verifyUserAccount');
const verifyUserEmail = require('./verifyUserEmail');

module.exports = {
  createUser,
  deleteUser,
  getUserIssues,
  getUserRepos,
  getUsers,
  getUserSettings,
  githubSignIn,
  oneUser,
  oneUserSignUp,
  searchUsers,
  signIn,
  signOut,
  transformUser,
  verifyUserAccount,
  verifyUserEmail,
};
