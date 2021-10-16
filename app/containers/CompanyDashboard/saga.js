import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { v4 as uuidv4 } from 'uuid';

import { post } from 'utils/request';

import {
  createPositionFailure,
  createPositionSuccess,
  fetchCompanyMatchesFailure,
  fetchCompanyMatchesSuccess,
  fetchPositionQuestionsFailure,
  fetchPositionQuestionsSuccess,
  notifyCandidateFailure,
  notifyCandidateSuccess,
  resetFormState,
} from './actions';
import {
  CREATE_POSITION,
  FETCH_COMPANY_MATCHES,
  FETCH_POSITION_QUESTIONS,
  NOTIFY_CANDIDATE,
} from './constants';

export function* createPositionSaga({ payload }) {
  const { responseArray } = payload;
  const formattedResponse = responseArray.map(
    ({ questionId, questionKey, responseId, value }) => `{
        questionId: "${questionId}",
        questionKey: "${questionKey}",
        responseId: "${responseId}",
        value: "${value}",
      }`,
  );
  const uuid = uuidv4();
  const query = `
    mutation {
      postUserResponse(
        companyId: "${uuid}",
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
    yield put(push('/dashboard'));
  } catch (error) {
    yield put(createPositionFailure({ error }));
  }
}

export function* fetchCompanyMatchesSaga() {
  const query = `
    query {
      getCompanyMatches {
        __typename
        ... on CompanyMatchesArray {
          companyMatchesArray {
            candidates
            position
          }
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getCompanyMatches: { companyMatchesArray },
      },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchCompanyMatchesSuccess({ companyMatchesArray }));
  } catch (error) {
    yield put(fetchCompanyMatchesFailure({ error }));
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

export function* notifyCandidateSaga({ payload }) {
  const { body, positionId, userId } = payload;
  const query = `
    mutation{
      createMessage(messageInput: {
        body: ${JSON.stringify(body)},
        positionId: "${positionId}",
        userId: "${userId}",
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
  yield takeLatest(FETCH_COMPANY_MATCHES, fetchCompanyMatchesSaga);
  yield takeLatest(FETCH_POSITION_QUESTIONS, fetchPositionQuestionsSaga);
  yield takeLatest(NOTIFY_CANDIDATE, notifyCandidateSaga);
}
