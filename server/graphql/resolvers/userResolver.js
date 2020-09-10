/* eslint-disable camelcase */
const Identicon = require('identicon.js');

const {
  checkDuplicateUserEmail,
  checkDuplicateUsername,
  createUser,
  getOneIssue,
  getOneOrganization,
  getOneUser,
  getOneUserSignUp,
  getOrganizationsWhere,
  getUsers,
  getUserWatchList,
  getWatchList,
  searchUsers,
  transformUser,
  updateUserArray,
} = require('../../db');
const { requestGithubUser } = require('../../integrations/github');
const { uploadImage } = require('../../middlewares/imageUpload');

const deletedUserImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBvwAcytGFLkWO2eT-FCwE5z_mlQxBdI9uwbyeczCTVBci7Vrg&usqp=CAU';

module.exports = {
  checkDuplicateUser: async args => {
    const { username, email } = args;
    try {
      await checkDuplicateUserEmail({ email });
      await checkDuplicateUsername({ username });

      return {
        __typename: 'Success',
        message: 'No duplicate user exists',
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  createUser: async args => {
    const {
      userInput: { email, firstName, id, lastName, username },
    } = args;

    const { uploadUrl } = await uploadImage(new Identicon(id, 250).toString());
    const newUser = {
      created_date: new Date(),
      email,
      first_name: firstName,
      id,
      last_name: lastName,
      modified_date: new Date(),
      profile_pic: uploadUrl,
      username,
    };

    try {
      await checkDuplicateUserEmail({ email });
      await checkDuplicateUsername({ username });

      const result = await createUser({ data: newUser });

      return result;
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async args => {
    const { userId } = args;
    try {
      const data = {
        activePullRequests: 0,
        attempting: [],
        balance: 0,
        comments: [],
        completedPullRequests: 0,
        dollarsEarned: 0,
        email_verified: false,
        email: '',
        first_name: 'Deleted',
        github_link: '',
        is_deleted: true,
        isOnline: false,
        issues: [],
        last_name: 'User',
        modified_date: new Date(), // update modified date
        organizations: [],
        personal_link: '',
        preferred_languages: [],
        profile_pic: deletedUserImage,
        rejectedPullRequests: 0,
        rep: 0,
        stackoverflow_link: '',
        username: '[deleted]',
      };
      await transformUser({ data, userId });
      return 'User successfully deleted';
    } catch (err) {
      throw err;
    }
  },
  getUsers: async () => {
    try {
      const result = await getUsers('users');
      return result;
    } catch (err) {
      throw err;
    }
  },
  getUserOrganizations: async args => {
    const { id } = args;
    try {
      const result = await getOrganizationsWhere({
        column: 'owner_id',
        value: id,
      });
      return result;
    } catch (err) {
      throw err;
    }
  },
  getWatchList: async args => {
    const { idArray, type } = args;
    try {
      const watchListResult = await Promise.all(
        idArray.map(async issueId => {
          const [result] = await getWatchList(issueId, type);
          return result;
        }),
      );
      const result = watchListResult;
      return result;
    } catch (err) {
      throw err;
    }
  },
  oneUser: async args => {
    const { id: userId } = args;
    try {
      const result = await getOneUser({ userId });
      const { attempting, issues, organizations } = result;

      // Pull user attempting detail
      const attemptingListResult = await Promise.all(
        attempting.map(async issueId => {
          const type = 'userAttemptList';
          const [attemptingResult] = await getWatchList(issueId, type);
          return attemptingResult;
        }),
      );
      result.attempting = attemptingListResult;

      // Pull user issue detail
      const issuesListResult = await Promise.all(
        issues.map(async issueId => {
          const issuesResult = await getOneIssue({ issueId });
          return issuesResult;
        }),
      );
      result.issues = issuesListResult;

      // Pull user organization detail
      const organizationsListResult = await Promise.all(
        organizations.map(async organizationId => {
          const organizationsResult = await getOneOrganization({
            organizationId,
          });
          return organizationsResult;
        }),
      );
      result.organizations = organizationsListResult;

      // Pull watch-list detail
      const watchingListResult = await getUserWatchList({ userId });
      result.watching = watchingListResult;

      return result;
    } catch (err) {
      throw err;
    }
  },
  oneUserSignUp: async args => {
    const { email } = args;
    try {
      const result = await getOneUserSignUp({ email });
      return result;
    } catch (err) {
      throw err;
    }
  },
  searchUsers: async args => {
    const { value } = args;
    try {
      const result = await searchUsers({ value });
      return result;
    } catch (err) {
      throw err;
    }
  },
  transformUser: async args => {
    const { userId, userInput } = args;
    try {
      if (userInput.profilePic) {
        const formattedProfilePic = userInput.profilePic;
        const protocol = formattedProfilePic.substring(0, 5);

        if (formattedProfilePic && protocol !== 'https') {
          const { uploadUrl } = await uploadImage(formattedProfilePic);
          userInput.profilePic = uploadUrl;
        }
      }
      const data = {
        attempting: userInput.attempting,
        balance: userInput.balance,
        comments: userInput.comments,
        email_verified: userInput.emailVerified,
        email: userInput.email,
        first_name: userInput.firstName,
        github_link: userInput.githubLink,
        issues: userInput.issues,
        last_name: userInput.lastName,
        modified_date: new Date(), // update modified date
        organizations: userInput.organizations,
        personal_link: userInput.personalLink,
        preferred_languages: userInput.preferredLanguages,
        profile_pic: userInput.profilePic,
        pull_requests: userInput.pullRequests,
        rep: userInput.rep,
        stackoverflow_link: userInput.stackoverflowLink,
        username: userInput.username,
      };
      const result = await transformUser({ data, userId });

      return {
        __typename: 'User',
        ...result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  updateUserArray: async args => {
    const { column, data, id, remove } = args;
    try {
      const [result] = await updateUserArray({
        column,
        data,
        remove,
        userId: id,
      });
      return result;
    } catch (error) {
      throw new Error('Too many requests.');
    }
  },
  verifyUserAccount: async args => {
    const { code, userId } = args;
    try {
      const { github_id, github_username } = await requestGithubUser({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code,
      });
      const { githubUsername, isGithubVerified } = await transformUser({
        data: {
          github_id,
          github_username,
          modified_date: new Date(),
        },
        userId,
      });
      return {
        __typename: 'Verification',
        githubUsername,
        isGithubVerified,
        message: `Your Github account has been successfully verified.`,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
};
