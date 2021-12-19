import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  closeModalState,
  fetchQuestionsFailure,
  fetchQuestionsSuccess,
  fetchUserDashboardFailure,
  fetchUserDashboardSuccess,
  fetchUserResponseFailure,
  fetchUserResponseSuccess,
  setHiringStatusFailure,
  setHiringStatusSuccess,
  updateUserFailure,
  updateUserResponsesFailure,
  updateUserResponsesSuccess,
  updateUserSuccess,
} from './actions';
import {
  FETCH_QUESTIONS,
  FETCH_USER_DASHBOARD,
  FETCH_USER_RESPONSE,
  SET_HIRING_STATUS,
  UPDATE_USER,
  UPDATE_USER_RESPONSES,
} from './constants';

export function* fetchQuestionsSaga({ payload }) {
  const { category } = payload;
  const query = `
    query{
      getQuestions(category: "${category}") {
        __typename
        ... on QuestionArray {
          questionArray {
            id
            limit
            questionKey
            questionText
            required
            responses {
              id
              responseKey
              value
            }
            subtext
          }
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getQuestions: { __typename, message, questionArray },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchQuestionsSuccess({ category, questions: questionArray }));
  } catch (error) {
    yield put(fetchQuestionsFailure({ error: { message: error } }));
  }
}

export function* fetchUserDashboardSaga() {
  const query = `
      query {
        getUserDashboard {
          __typename
          ... on User {
            firstName
            githubId
            githubLink
            hiringStatus
            id
            isGithubVerified
            issues
            lastName
            matches
            notifications
            personalLink
            profilePic
            skills
            stackoverflowLink
            surveyComplete
            unreadMessages
          }
          ...on Error {
            message
          }
        }
      }
    `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getUserDashboard: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchUserDashboardSuccess({ user: restProps }));
  } catch (error) {
    yield put(fetchUserDashboardFailure({ error: { message: error } }));
  }
}

export function* fetchUserResponseSaga() {
  const query = `
    query {
      getUserResponse {
        __typename
        ... on User {
          skills
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getUserResponse: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchUserResponseSuccess({ user: restProps }));
  } catch (error) {
    yield put(fetchUserResponseFailure({ error: { message: error } }));
  }
}

export function* setHiringStatusSaga({ payload }) {
  const { hiringStatus } = payload;

  // Hiring status is set to 'active', 'inactive', 'undeclared'
  // We use this to determine whether the user has ever indicated
  // interest in the hiring platform

  const query = `
      mutation {
        setHiringStatus(hiringStatus: "${hiringStatus}") {
          __typename
          ... on Success {
            message
          }
          ...on Error {
            message
          }
        }
      }
    `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        setHiringStatus: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;

    yield put(
      setHiringStatusSuccess({
        hiringStatus,
      }),
    );
  } catch (error) {
    yield put(setHiringStatusFailure({ error: { message: error } }));
  }
}

export function* updateUserSaga({ payload }) {
  const { githubLink, personalLink, stackoverflowLink } = payload;
  const query = `
    mutation {
      transformUser(userInput: {
        githubLink: "${githubLink}" 
        personalLink: "${personalLink}"
        stackoverflowLink: "${stackoverflowLink}"
      }) {
        __typename
        ... on Success {
          message
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        transformUser: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(updateUserSuccess());
    yield put(closeModalState());
  } catch (error) {
    yield put(updateUserFailure({ error: { message: error } }));
  }
}

export function* updateUserResponsesSaga({ payload }) {
  const { responseArray } = payload;
  const formattedResponse = responseArray.map(
    ({ questionId, questionKey, responseId, value }) => {
      const formattedValue =
        questionKey === 'skills'
          ? `{
            beginner: ${value.beginner},
            expert: ${value.expert},
            intermediate: ${value.intermediate},
            skill: "${value.skill}"
          }`
          : `"${value}"`;

      return `{
        questionId: "${questionId}",
        questionKey: "${questionKey}",
        responseId: "${responseId}",
        value: ${formattedValue},
      }`;
    },
  );
  const query = `
    mutation {
      transformUserResponse(
        responseArray: [${formattedResponse}]
      ) {
        __typename
        ... on Success {
          message
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        transformUserResponse: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(updateUserResponsesSuccess());
    yield put(closeModalState());
  } catch (error) {
    yield put(updateUserResponsesFailure({ error: { message: error } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_QUESTIONS, fetchQuestionsSaga);
  yield takeLatest(FETCH_USER_DASHBOARD, fetchUserDashboardSaga);
  yield takeLatest(FETCH_USER_RESPONSE, fetchUserResponseSaga);
  yield takeLatest(SET_HIRING_STATUS, setHiringStatusSaga);
  yield takeLatest(UPDATE_USER_RESPONSES, updateUserResponsesSaga);
  yield takeLatest(UPDATE_USER, updateUserSaga);
}
