const activitySchema = require('./activity');
const attemptingSchema = require('./attempting');
const commentSchema = require('./comments');
const fundingSchema = require('./funding');
const issueSchema = require('./issues');
const organizationSchema = require('./organizations');
const pullRequestSchema = require('./pullRequest');
const userSchema = require('./users');
const watchingSchema = require('./watching');
const withdrawalSchema = require('./withdrawal');

module.exports = {
  ...activitySchema,
  ...attemptingSchema,
  ...commentSchema,
  ...fundingSchema,
  ...issueSchema,
  ...organizationSchema,
  ...pullRequestSchema,
  ...userSchema,
  ...watchingSchema,
  ...withdrawalSchema,
};
