const { v4: uuidv4 } = require('uuid');
const {
  createUser,
  getUsers,
  getOneUser,
  deleteUser,
  transformUser,
} = require('../../db');

module.exports = {
  getUsers: async () => {
    try {
      const result = await getUsers('users');
      return result;
    } catch (err) {
      throw err;
    }
  },
  oneUser: async args => {
    const { id } = args;
    try {
      const [result] = await getOneUser('users', id);
      return result;
    } catch (err) {
      throw err;
    }
  },
  createUser: async args => {
    const { userInput } = args;
    const issue = [
      [
        uuidv4(),
        new Date(),
        new Date(),
        userInput.first_name,
        userInput.last_name,
        userInput.email,
        userInput.watching_list || [],
        userInput.rep || 0,
        userInput.profile_pic,
        userInput.active_number,
        userInput.issues_number,
        userInput.username,
      ],
    ];
    try {
      const result = await createUser(issue);
      return result;
    } catch (err) {
      throw err;
    }
  },
  transformUser: async args => {
    const { id, userInput } = args;
    try {
      const data = [
        [
          new Date(), // update modified date
          userInput.first_name,
          userInput.last_name,
          userInput.email,
          userInput.watching_list || [],
          userInput.rep || 0,
          userInput.profile_pic,
          userInput.active_number,
          userInput.issues_number,
          userInput.username,
        ],
      ];
      const result = await transformUser('users', id, data);
      return result;
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async args => {
    const { id } = args;
    try {
      const result = await deleteUser('users', id);
      return result;
    } catch (err) {
      throw err;
    }
  },
};
