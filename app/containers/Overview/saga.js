import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  fetchOrganizationOptionsFailure,
  fetchOrganizationOptionsSuccess,
} from './actions';
import { FETCH_ORGANIZATION_OPTIONS } from './constants';

export function* fetchOrganizationOptionsSaga() {
  const query = `
    query {
      getOrganizations {
        __typename
        ... on OrganizationArray {
          organizations {
            name
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
        getOrganizations: { organizations },
      },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchOrganizationOptionsSuccess({ organizations }));
  } catch (error) {
    yield put(fetchOrganizationOptionsFailure());
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_ORGANIZATION_OPTIONS, fetchOrganizationOptionsSaga);
}
