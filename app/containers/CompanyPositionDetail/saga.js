import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  closeModalState,
  fetchCompany,
  fetchCompanyFailure,
  fetchCompanySuccess,
  fetchPositionDetailFailure,
  fetchPositionDetailSuccess,
  notifyCompanyFailure,
  notifyCompanySuccess,
  resetFormState,
} from './actions';
import {
  FETCH_COMPANY,
  FETCH_POSITION_DETAIL,
  NOTIFY_COMPANY,
} from './constants';

export function* fetchCompanySaga({ payload }) {
  const { companyId } = payload;
  const query = `
    query {
      oneCompany(companyId: "${companyId}") {
        __typename
        ... on Company {
          description
          location
          logo
          name
          size
          website
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
        oneCompany: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchCompanySuccess({ company: restProps }));
  } catch (error) {
    yield put(fetchCompanyFailure());
  }
}

export function* fetchPositionDetailSaga({ payload }) {
  const { positionId, userId } = payload;
  const query = `
    query {
      onePosition(positionId: "${positionId}", userId: "${userId}") {
        __typename
        ... on Position {
          companyId
          description
          experience
          hasApplied
          id
          isActive
          location
          role
          salary
          skills
          timezone
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
        onePosition: { __typename, companyId, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchPositionDetailSuccess({ position: restProps }));
    yield put(fetchCompany({ companyId }));
  } catch (error) {
    yield put(fetchPositionDetailFailure());
  }
}

export function* notifyCompanySaga({ payload }) {
  const { body, positionId } = payload;
  const query = `
    mutation{
      createMessage(messageInput: {
        body: ${JSON.stringify(body)},
        positionId: "${positionId}",
      }) {
        __typename
        ... on MessageResponse {
          body
          createdDate
          firstName
          lastName
          profilePic
          readDate
          threadId
          username
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
        createMessage: { __typename, message, threadId },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(notifyCompanySuccess({ threadId }));
    yield put(resetFormState());
    yield put(closeModalState());
  } catch (error) {
    yield put(notifyCompanyFailure({ error: { message: error } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_COMPANY, fetchCompanySaga);
  yield takeLatest(FETCH_POSITION_DETAIL, fetchPositionDetailSaga);
  yield takeLatest(NOTIFY_COMPANY, notifyCompanySaga);
}
