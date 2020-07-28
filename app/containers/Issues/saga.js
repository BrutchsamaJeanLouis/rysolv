/* eslint-disable no-underscore-dangle */
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchActiveUser,
  updateActiveUser,
  upvoteUserTemp,
} from 'containers/Auth/actions';
import { updatePaymentModal } from 'containers/Main/actions';
import { post } from 'utils/request';

import {
  addAttemptFailure,
  addAttemptSuccess,
  addCommentFailure,
  addCommentSuccess,
  addWatchFailure,
  addWatchSuccess,
  closeIssueFailure,
  closeIssueSuccess,
  editIssueFailure,
  editIssueSuccess,
  fetchIssueDetail,
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
  submitAccountPaymentFailure,
  submitAccountPaymentSuccess,
  upvoteIssueFailure,
  upvoteIssueSuccess,
  upvoteIssueTemp,
} from './actions';
import {
  ADD_ATTEMPT,
  ADD_COMMENT,
  CLOSE_ISSUE,
  EDIT_ISSUE,
  FETCH_ISSUE_DETAIL,
  FETCH_ISSUES,
  IMPORT_ISSUE,
  SAVE_INFO,
  SEARCH_ISSUES,
  SUBMIT_ACCOUNT_PAYMENT,
  successCreateIssueMessage,
  successEditIssueMessage,
  successAccountPaymentMessage,
  UPVOTE_ISSUE,
} from './constants';

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

export function* closeIssueSaga({ payload }) {
  const { issueId, shouldClose } = payload;
  const query = `
  mutation{
    closeIssue(id: "${issueId}", shouldClose: ${shouldClose})
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { closeIssue },
    } = yield call(post, '/graphql', graphql);
    yield put(closeIssueSuccess({ issueId, message: closeIssue }));
  } catch (error) {
    yield put(closeIssueFailure({ error }));
  }
}

export function* editIssueSaga({ payload }) {
  const { editRequest, issueId } = payload;
  const { body, language, name } = editRequest;
  const query = `
    mutation {
      transformIssue(id: "${issueId}", issueInput: {
        body: ${JSON.stringify(body)},
        language: ${JSON.stringify(language)},
        name: "${name}",
      }) {
        __typename
        ... on Issue {
          id,
          attempting,
          attempts,
          body,
          comments,
          contributor,
          createdDate,
          fundedAmount,
          language,
          modifiedDate,
          name,
          open,
          organizationId,
          organizationName,
          organizationVerified,
          profilePic,
          rep,
          repo,
          userId,
          username,
          watching
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
      data: { transformIssue },
    } = yield call(post, '/graphql', graphql);
    if (transformIssue.__typename === 'Error') {
      throw transformIssue;
    }
    yield put(fetchIssueDetail({ id: issueId }));
    yield put(editIssueSuccess({ message: successEditIssueMessage }));
  } catch (error) {
    yield put(editIssueFailure({ error }));
  }
}

export function* fetchIssueDetailSaga({ payload }) {
  const { id } = payload;
  const query = `
    query {
      oneIssue(id: "${id}") {
        __typename
        ... on Issue {
          attempting,
          attempts,
          body,
          comments,
          contributor,
          createdDate,
          fundedAmount,
          id,
          language,
          modifiedDate,
          name,
          open,
          organizationId,
          organizationName,
          organizationVerified,
          profilePic
          pullRequests,
          rep,
          repo,
          userId,
          username,
          watching,
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
      ... on ImportData {
        issueBody,
        issueLanguages,
        issueName,
        issueUrl,
        organizationDescription,
        organizationId,
        organizationLanguages,
        organizationLogo,
        organizationName,
        organizationRepo,
        organizationUrl,
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
      issueBody,
      issueLanguages,
      issueName,
      issueUrl,
      organizationDescription,
      organizationId,
      organizationLogo,
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
          language:  ${JSON.stringify(issueLanguages)},
          name: ${JSON.stringify(issueName)},
          organizationDescription:  "${organizationDescription}",
          organizationId:  ${JSON.stringify(organizationId)},
          organizationLogo:  ${JSON.stringify(organizationLogo)},
          organizationName:  "${organizationName}",
          organizationRepo:  "${organizationRepo}",
          organizationUrl:  "${organizationUrl}",
          repo: "${issueUrl}",
        }
      ) {
        __typename
        ... on Issue {
          id
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
      data: { createIssue },
    } = yield call(post, '/graphql', graphql);
    const { __typename, message } = createIssue;
    if (__typename === 'Error') throw message;

    yield put(fetchActiveUser({ userId }));
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

export function* submitAccountPaymentSaga({ payload }) {
  const { fundValue, issueId, organizationId, userId } = payload;
  const isFundedFromOverview = window.location.pathname === '/issues';
  const submitAccountPaymentQuery = `
      mutation {
        submitAccountPayment(fundValue: ${fundValue}, issueId: "${issueId}", organizationId: "${organizationId}", userId: "${userId}" ) {
          __typename
          ... on Payment {
            balance,
            fundedAmount
          }
          ... on Error {
            message
          }
        }
      }
    `;
  try {
    const graphql = JSON.stringify({
      query: submitAccountPaymentQuery,
      variables: {},
    });
    const {
      data: { submitAccountPayment },
    } = yield call(post, '/graphql', graphql);
    const { balance, fundedAmount } = submitAccountPayment;
    yield put(
      submitAccountPaymentSuccess({
        fundedAmount,
        isFundedFromOverview,
        issueId,
        message: successAccountPaymentMessage,
      }),
    );
    yield put(updateActiveUser({ balance }));
    yield put(updatePaymentModal({ balance, fundedAmount }));
  } catch (error) {
    yield put(submitAccountPaymentFailure({ error }));
  }
}

export function* upvoteIssuesSaga({ payload }) {
  const { issueId, upvote, userId } = payload;

  // Update front end upvote. Reduce percieved loading time.
  yield put(upvoteIssueTemp({ issueId, upvote }));
  yield put(upvoteUserTemp({ issueId, upvote }));

  const upvoteIssueQuery = `
    mutation {
      upvoteIssue(issueId: "${issueId}", upvote: ${upvote}, userId: "${userId}") {
        __typename
        ... on Upvote {
          issueRep,
          userRep
        }
        ... on Error {
          message
        }
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
        upvoteIssue: { __typename, issueRep, message, userRep },
      },
    } = yield call(post, '/graphql', upvoteIssue);
    if (__typename === 'Error') throw new Error(message);

    yield put(upvoteIssueSuccess({ issueId, issueRep }));

    if (upvote) {
      yield put(updateActiveUser({ rep: userRep, addUpvote: issueId }));
    } else {
      yield put(updateActiveUser({ rep: userRep, removeUpvote: issueId }));
    }
  } catch (error) {
    yield put(upvoteIssueFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(ADD_ATTEMPT, addAttemptSaga);
  yield takeLatest(ADD_COMMENT, addCommentSaga);
  yield takeLatest(CLOSE_ISSUE, closeIssueSaga);
  yield takeLatest(EDIT_ISSUE, editIssueSaga);
  yield takeLatest(FETCH_ISSUE_DETAIL, fetchIssueDetailSaga);
  yield takeLatest(FETCH_ISSUES, fetchIssuesSaga);
  yield takeLatest(IMPORT_ISSUE, importIssueSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
  yield takeLatest(SEARCH_ISSUES, searchIssuesSaga);
  yield takeLatest(SUBMIT_ACCOUNT_PAYMENT, submitAccountPaymentSaga);
  yield takeLatest(UPVOTE_ISSUE, upvoteIssuesSaga);
}
