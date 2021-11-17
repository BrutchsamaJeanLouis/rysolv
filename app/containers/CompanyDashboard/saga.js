/* eslint-disable no-nested-ternary, prettier/prettier */
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { v4 as uuidv4 } from 'uuid';

import { post } from 'utils/request';

import {
  createPositionFailure,
  createPositionSuccess,
  deletePositionFailure,
  deletePositionSuccess,
  editPositionFailure,
  editPositionSuccess,
  fetchCompanyPositions,
  fetchCompanyPositionsFailure,
  fetchCompanyPositionsSuccess,
  fetchPositionCandidatesFailure,
  fetchPositionCandidatesSuccess,
  fetchPositionFailure,
  fetchPositionQuestionsFailure,
  fetchPositionQuestionsSuccess,
  fetchPositionSuccess,
  notifyCandidateFailure,
  notifyCandidateSuccess,
  resetFormState,
} from './actions';
import {
  CREATE_POSITION,
  DELETE_POSITION,
  EDIT_POSITION,
  FETCH_COMPANY_POSITIONS,
  FETCH_POSITION_CANDIDATES,
  FETCH_POSITION_QUESTIONS,
  FETCH_POSITION,
  NOTIFY_CANDIDATE,
} from './constants';

export function* createPositionSaga({ payload }) {
  const { companyId, responseArray } = payload;
  const positionId = uuidv4();
  const formattedResponse = responseArray.map(
    ({ questionId, questionKey, responseId, value }) => {
      const formattedValue =
        questionKey === 'description'
          ? `${JSON.stringify(value)}`
          : questionKey === 'skills'
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
      postPositionResponse(
        companyId: "${companyId}",
        positionId: "${positionId}",
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
        postUserResponse: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(createPositionSuccess({ message }));
    yield put(fetchCompanyPositions({ companyId }));
    yield put(push('/company/dashboard'));
  } catch (error) {
    yield put(createPositionFailure({ error: { message: error } }));
  }
}

export function* deletePositionSaga({ payload }) {
  const { positionId } = payload;
  const query = `
    mutation{
      deletePosition(positionId: "${positionId}") {
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
        deletePosition: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(deletePositionSuccess());
    yield put(push('/dashboard'));
  } catch (error) {
    yield put(deletePositionFailure({ error: { message: error } }));
  }
}

export function* editPositionSaga({ payload }) {
  const { companyId, positionId, responseArray } = payload;
  const formattedResponse = responseArray.map(
    ({ questionId, questionKey, responseId, value }) => {
      const formattedValue =
        questionKey === 'description'
          ? `${JSON.stringify(value)}`
          : questionKey === 'skills'
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
      transformPosition(
        positionId: "${positionId}",
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
        transformPosition: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(editPositionSuccess());
    yield put(fetchCompanyPositions({ companyId }));
    yield put(push('/dashboard'));
  } catch (error) {
    yield put(editPositionFailure({ error: { message: error } }));
  }
}

export function* fetchCompanyPositionsSaga({ payload }) {
  const { companyId } = payload;
  const query = `
    query {
      getCompanyPositions(companyId: "${companyId}") {
        __typename
        ... on CompanyPositionsArray {
          positions {
            id
            isRemote
            location
            title
          }
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getCompanyPositions: { positions },
      },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchCompanyPositionsSuccess({ positions }));
  } catch (error) {
    yield put(fetchCompanyPositionsFailure({ error }));
  }
}

export function* fetchPositionCandidatesSaga({ payload }) {
  const { positionId } = payload;
  const query = `
    query {
      getPositionCandidates(positionId: "${positionId}") {
        __typename
        ... on PositionCandidatesArray {
          candidates {
            firstName
            id
            isHired
            isInterviewRequested
            isSaved
            lastName
            lastPosition
            location
            percentMatch
            preferredLanguages
            profilePic
            salary
            type
            yearsOfExperience
          }
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getPositionCandidates: { candidates },
      },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchPositionCandidatesSuccess({ candidates }));
  } catch (error) {
    yield put(fetchPositionCandidatesFailure({ error }));
  }
}

export function* fetchPositionQuestionsSaga({ payload }) {
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
    yield put(fetchPositionQuestionsSuccess({ questions: questionArray }));
  } catch (error) {
    yield put(fetchPositionQuestionsFailure({ error }));
  }
}

export function* fetchPositionSaga({ payload }) {
  const { positionId } = payload;
  const query = `
    query {
      onePosition(positionId: "${positionId}") {
        __typename
        ... on Position {
          description
          experience
          hiringTimeframe
          isRemote
          location
          role
          salary
          skills
          title
          type
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
        onePosition: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchPositionSuccess({ position: restProps }));
  } catch (error) {
    yield put(fetchPositionFailure({ error }));
  }
}

export function* notifyCandidateSaga({ payload }) {
  // TODO: update payload
  const { body, positionId, userId } = payload;
  const query = `
    mutation{
      createMessage(messageInput: {
        body: ${JSON.stringify(body)},
        positionId: "${positionId}",
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
        createMessage: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(notifyCandidateSuccess({ message }));
    yield put(resetFormState());
  } catch (error) {
    yield put(notifyCandidateFailure({ error: { message: error } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(CREATE_POSITION, createPositionSaga);
  yield takeLatest(DELETE_POSITION, deletePositionSaga);
  yield takeLatest(EDIT_POSITION, editPositionSaga);
  yield takeLatest(FETCH_COMPANY_POSITIONS, fetchCompanyPositionsSaga);
  yield takeLatest(FETCH_POSITION_CANDIDATES, fetchPositionCandidatesSaga);
  yield takeLatest(FETCH_POSITION_QUESTIONS, fetchPositionQuestionsSaga);
  yield takeLatest(FETCH_POSITION, fetchPositionSaga);
  yield takeLatest(NOTIFY_CANDIDATE, notifyCandidateSaga);
}
