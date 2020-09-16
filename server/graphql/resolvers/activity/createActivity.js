const { v4: uuidv4 } = require('uuid');
const { createActivity: createActivityQuery } = require('../../../db');

const createActivity = async args => {
  const { activityInput } = args;
  const data = {
    action_type: activityInput.actionType || null,
    activity_id: uuidv4(),
    created_date: activityInput.createdDate || new Date(),
    funded_value: activityInput.fundedValue || null,
    is_private: activityInput.isPrivate || false,
    issue_id: activityInput.issueId || null,
    organization_id: activityInput.organizationId || null,
    pullrequest_id: activityInput.pullRequestId || null,
    user_id: activityInput.userId || null,
  };

  const message = await createActivityQuery({ data });
  return message;
};

module.exports = createActivity;
