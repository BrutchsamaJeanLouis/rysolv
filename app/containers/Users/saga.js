import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import { FETCH_INFO, FETCH_USERS, SEARCH_USERS } from './constants';
import {
  fetchInfoFailure,
  fetchInfoSuccess,
  fetchUsersFailure,
  fetchUsersSuccess,
  searchUsersFailure,
  searchUsersSuccess,
} from './actions';

export function* fetchInfoSaga({ payload }) {
  const { userId } = payload;
  const query = `
    query {
      oneUser(id: "${userId}") {
        __typename
        ... on User {
          activePullRequests
          attempting
          completedPullRequests
          createdDate
          dollarsEarned
          firstName
          githubLink
          id
          isOnline
          issues
          lastName
          modifiedDate
          personalLink
          preferredLanguages
          profilePic
          rejectedPullRequests
          rep
          stackoverflowLink
          username
        }
        ... on Error {
          message
        }
      }
      getUserActivity(userId: "${userId}") {
        actionType
        activityId
        createdDate
        fundedValue
        issueId
        issueName
        organizationId
        organizationName
        pullRequestId
        userId
        username
      }
    }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        getUserActivity,
        oneUser: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    restProps.activity = getUserActivity;
    yield put(fetchInfoSuccess({ user: restProps }));
  } catch (error) {
    yield put(fetchInfoFailure({ error: { message: error } }));
  }
}

export function* fetchUsersSaga() {
  const query = `
    query {
      getUsers {
        __typename
        ... on UserArray {
          users {
            attempting
            createdDate
            firstName
            id
            issues
            lastName
            preferredLanguages
            profilePic
            rep
            username
          }
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        getUsers: { __typename, message, users },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') {
      throw message;
    }
    yield put(fetchUsersSuccess({ users }));
  } catch (error) {
    yield put(fetchUsersFailure({ error }));
  }
}

export function* searchUsersSaga({ payload }) {
  const { value } = payload;
  const query = `
    query {
      searchUsers(value: "${value}") {
        attempting
        createdDate
        firstName
        id
        issues
        lastName
        profilePic
        rep
        username
      }
    }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { searchUsers },
    } = yield call(post, '/graphql', graphql);
    yield put(searchUsersSuccess({ searchUsers }));
  } catch (error) {
    yield put(searchUsersFailure());
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
  yield takeLatest(SEARCH_USERS, searchUsersSaga);
}
