/* eslint-disable no-underscore-dangle */
import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchActiveUser } from 'containers/Auth/actions';
import { post } from 'utils/request';

import {
  ADD_ATTEMPT,
  ADD_COMMENT,
  DELETE_ISSUE,
  FETCH_ISSUE_DETAIL,
  FETCH_ISSUES,
  IMPORT_ISSUE,
  SAVE_INFO,
  SEARCH_ISSUES,
  successCreateIssueMessage,
  UPVOTE_ISSUE,
} from './constants';
import {
  addAttemptFailure,
  addAttemptSuccess,
  addCommentFailure,
  addCommentSuccess,
  addWatchFailure,
  addWatchSuccess,
  deleteIssueFailure,
  deleteIssueSuccess,
  fetchIssueDetailFailure,
  fetchIssueDetailSuccess,
  fetchIssuesFailure,
  fetchIssuesSuccess,
  importIssueFailure,
  importIssueSuccess,
  saveInfoFailure,
  saveInfoSuccess,
  searchIssuesFailure,
  searchIssuesSuccess,
  upvoteIssueFailure,
  upvoteIssueSuccess,
} from './actions';

export function* addAttemptSaga({ payload }) {
  const { id: issueId, userId, column, remove } = payload;
  const query = `
  mutation {
    updateIssueArray(id: "${issueId}", column: "${column}", data: "${userId}", remove: ${remove}) {
      id,
      attempting,
      watching
    }
    updateUserArray(id: "${userId}", column: "${column}", data: "${issueId}", remove: ${remove}) {
      attempting,
      watching
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { updateIssueArray },
    } = yield call(post, '/graphql', graphql);
    yield put(addAttemptSuccess(updateIssueArray));
    yield put(addWatchSuccess(updateIssueArray));
    yield put(fetchActiveUser({ userId }));
  } catch (error) {
    yield put(addAttemptFailure({ error }));
    yield put(addWatchFailure({ error }));
  }
}

export function* addCommentSaga({ payload }) {
  const { activeUser, body, issueId } = payload;
  const query = `
  mutation{
    createComment(commentInput: {
      body: ${JSON.stringify(body)},
      target: "${issueId}",
      user: "${activeUser.id}"
    }) {
      body,
      commentId,
      createdDate,
      profilePic
      target,
      username,
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const { data: createComment } = yield call(post, '/graphql', graphql);
    yield put(addCommentSuccess(createComment));
  } catch (error) {
    yield put(addCommentFailure({ error }));
  }
}

export function* deleteIssueSaga({ payload }) {
  const { itemId } = payload;
  const query = `
  mutation{
    deleteIssue(id: "${itemId}")
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { deleteIssue },
    } = yield call(post, '/graphql', graphql);
    yield put(deleteIssueSuccess({ itemId, message: deleteIssue }));
  } catch (error) {
    yield put(deleteIssueFailure({ error }));
  }
}

export function* fetchIssueDetailSaga({ payload }) {
  const { id } = payload;
  const query = `
    query {
      oneIssue(id: "${id}") {
        __typename
        ... on Issue {
          id,
          createdDate,
          modifiedDate,
          attempts,
          body,
          comments,
          attempting,
          contributor,
          language,
          name,
          organizationId,
          organizationName,
          organizationVerified,
          rep,
          repo,
          fundedAmount,
          watching,
          open,
          userId,
          username,
          profilePic
        }
        ... on Error {
          message
        }
      }
      getIssueComments(id: "${id}") {
        body
        userId
        username
        createdDate
        profilePic
      }
    }
  `;
  try {
    // Query Issue Detail
    const issueQuery = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        oneIssue,
        oneIssue: { __typename },
        getIssueComments,
      },
    } = yield call(post, '/graphql', issueQuery);

    if (__typename === 'Error') {
      throw new Error(oneIssue.message);
    }

    oneIssue.comments = getIssueComments;

    yield put(fetchIssueDetailSuccess({ oneIssue }));
  } catch (error) {
    yield put(fetchIssueDetailFailure({ error }));
  }
}

export function* fetchIssuesSaga() {
  const issues = `
  query {
    getIssues {
      id,
      createdDate,
      modifiedDate,
      attempting,
      body,
      comments,
      language,
      name,
      organizationId,
      organizationName,
      organizationVerified,
      rep,
      repo,
      fundedAmount,
      watching,
      open,
      type,
    }
  }
`;
  try {
    const issueQuery = JSON.stringify({
      query: issues,
      variables: {},
    });
    const {
      data: { getIssues },
    } = yield call(post, '/graphql', issueQuery);

    yield put(fetchIssuesSuccess(getIssues));
  } catch (error) {
    yield put(fetchIssuesFailure({ error }));
  }
}

export function* importIssueSaga({ payload }) {
  const { validatedUrl } = payload;
  const query = `
  mutation{
    importIssue(url: "${validatedUrl}") {
      __typename
      ... on Issue {
        id
      }
      ... on Error {
        message
      }
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        importIssue,
        importIssue: { __typename },
      },
    } = yield call(post, '/graphql', graphql);

    if (__typename === 'Error') {
      throw new Error(importIssue.message);
    }

    yield put(importIssueSuccess({ importIssue }));
  } catch (error) {
    yield put(importIssueFailure({ error }));
  }
}

export function* saveInfoSaga({ payload }) {
  const {
    requestBody: {
      issueName,
      issueBody,
      issueUrl,
      languages,
      organizationDescription,
      organizationId,
      organizationName,
      organizationRepo,
      organizationUrl,
    },
    activeUser: { id: userId },
  } = payload;

  const query = `
  mutation{
    createIssue(
      issueInput: {
        body: ${JSON.stringify(issueBody)},
        contributor: "${userId}",
        language:  ${JSON.stringify(languages)},
        name: "${issueName}",
        organizationDescription:  "${organizationDescription}",
        organizationId:  "${organizationId}",
        organizationName:  "${organizationName}",
        organizationRepo:  "${organizationRepo}",
        organizationUrl:  "${organizationUrl}",
        repo: "${issueUrl}",
      }
    )
    { id }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    yield call(post, '/graphql', graphql);
    yield put(saveInfoSuccess({ message: successCreateIssueMessage }));
  } catch (error) {
    yield put(saveInfoFailure({ error }));
  }
}

export function* searchIssuesSaga({ payload }) {
  const { value } = payload;
  const query = `
  query {
    searchIssues(value: "${value}") {
      id,
      createdDate,
      modifiedDate,
      attempting,
      body,
      comments,
      language,
      name,
      organizationId,
      organizationName,
      organizationVerified,
      rep,
      repo,
      fundedAmount,
      watching,
      open,
    }
  }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { searchIssues },
    } = yield call(post, '/graphql', graphql);

    yield put(searchIssuesSuccess({ issues: searchIssues }));
  } catch (error) {
    yield put(searchIssuesFailure({ error }));
  }
}

export function* upvoteIssuesSaga({ payload }) {
  const { issueId, userId } = payload;
  const upvoteIssueQuery = `
      mutation {
        upvoteIssue(id: "${issueId}" ) {
          id,
          rep
        }
        userUpvote(id: "${userId}" ) {
          id,
          rep
        }
        updateUserArray(id: "${userId}", column: "upvotes", data: "${issueId}", remove: false ) {
          attempting,
          watching
        }
      }
    `;
  try {
    const upvoteIssue = JSON.stringify({
      query: upvoteIssueQuery,
      variables: {},
    });
    const {
      data: {
        upvoteIssue: { id, rep },
      },
    } = yield call(post, '/graphql', upvoteIssue);

    yield put(upvoteIssueSuccess({ id, rep }));
    yield put(fetchActiveUser({ userId }));
  } catch (error) {
    yield put(upvoteIssueFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(ADD_ATTEMPT, addAttemptSaga);
  yield takeLatest(ADD_COMMENT, addCommentSaga);
  yield takeLatest(DELETE_ISSUE, deleteIssueSaga);
  yield takeLatest(FETCH_ISSUE_DETAIL, fetchIssueDetailSaga);
  yield takeLatest(FETCH_ISSUES, fetchIssuesSaga);
  yield takeLatest(IMPORT_ISSUE, importIssueSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
  yield takeLatest(SEARCH_ISSUES, searchIssuesSaga);
  yield takeLatest(UPVOTE_ISSUE, upvoteIssuesSaga);
}
