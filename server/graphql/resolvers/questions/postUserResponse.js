const { v4: uuidv4 } = require('uuid');

const { CustomError, errorLogger } = require('../../../helpers');
const {
  postUserResponse: postUserResponseQuery,
  setPreferredLanguage,
} = require('../../../db');
const {
  postUserResponseError,
  postUserResponseSuccess,
} = require('./constants');

const postUserResponse = async ({ responseArray }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    await Promise.all(
      responseArray.map(
        async ({ questionId, questionKey, responseId, value }) => {
          if (questionKey === 'preferred_languages') {
            await setPreferredLanguage({ language: value, userId });
          } else {
            const data = {
              createdDate: new Date(),
              id: uuidv4(),
              questionId,
              responseId,
              userId,
            };
            await postUserResponseQuery(data);
          }
        },
      ),
    );

    return {
      __typename: 'Success',
      message: postUserResponseSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || postUserResponseError,
    };
  }
};

module.exports = postUserResponse;
