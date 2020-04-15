import { call, put, takeLatest, all } from 'redux-saga/effects';
import { post } from 'utils/request';
import {
  DELETE_ISSUE,
  FETCH_ISSUE_DETAIL,
  FETCH_ISSUES,
  SAVE_INFO,
  SEARCH_ISSUES,
  successCreateIssueMessage,
  UPVOTE_ISSUE,
} from './constants';
import {
  deleteIssueFailure,
  deleteIssueSuccess,
  fetchIssueDetailFailure,
  fetchIssueDetailSuccess,
  fetchIssuesFailure,
  fetchIssuesSuccess,
  saveInfoFailure,
  saveInfoSuccess,
  searchIssuesFailure,
  searchIssuesSuccess,
  upvoteIssueFailure,
  upvoteIssueSuccess,
} from './actions';

const generateOrganizationQuery = id => {
  const orgQuery = `
  query {
    oneOrganization(id: "${id}") {
      __typename
      ... on Organization {
        verified
        name
      }
      ... on Error {
        message
      }
    }
  }
 `;
  return [
    JSON.stringify({
      query: orgQuery,
      variables: {},
    }),
  ];
};

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

export function* fetchIssuesSaga() {
  const issues = `
  query {
    getIssues {
      id,
      createdDate,
      modifiedDate,
      attempts,
      body,
      comments,
      language,
      name,
      organizationId,
      rep,
      repo,
      value,
      watchList,
      open,
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

    const organizationQuery = getIssues.map(issue =>
      generateOrganizationQuery(issue.organizationId),
    );

    const results = yield all(
      organizationQuery.map(organizationId =>
        call(post, '/graphql', organizationId),
      ),
    );

    const formattedGetIssues = results.reduce(
      (acc, { data: { oneOrganization } }, index) => {
        const { name, verified } = oneOrganization || {};

        acc[index].organizationVerified = verified || false;
        acc[index].organizationName = name || '[No Organization]';

        return acc;
      },
      getIssues,
    );
    yield put(fetchIssuesSuccess(formattedGetIssues));
  } catch (error) {
    yield put(fetchIssuesFailure({ error }));
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
          contributor,
          language,
          name,
          organizationId,
          rep,
          repo,
          value,
          watchList,
          open,
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const issueQuery = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { oneIssue },
    } = yield call(post, '/graphql', issueQuery);
    const userQuery = `
    query {
      oneUser(id:"${oneIssue.contributor[0]}") {
        username,
        profilePic
      }
    }
    `;

    const userDetail = JSON.stringify({
      query: userQuery,
      variables: {},
    });

    const {
      data: {
        oneUser: { username, profilePic },
      },
    } = yield call(post, '/graphql', userDetail);

    oneIssue.user = {
      username,
      profilePic,
    };
    yield put(fetchIssueDetailSuccess({ oneIssue }));
  } catch (error) {
    yield put(fetchIssueDetailFailure({ error }));
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
      attempts,
      body,
      comments,
      language,
      name,
      organizationId,
      rep,
      repo,
      value,
      watchList,
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

    const organizationQuery = searchIssues.map(issue =>
      generateOrganizationQuery(issue.organizationId),
    );

    const results = yield all(
      organizationQuery.map(organizationId =>
        call(post, '/graphql', organizationId),
      ),
    );

    const formattedsearchIssues = results.reduce(
      (acc, { data: { oneOrganization } }, index) => {
        const { name, verified } = oneOrganization || {};

        acc[index].organizationVerified = verified || false;
        acc[index].organizationName = name || '[No Organization]';

        return acc;
      },
      searchIssues,
    );

    yield put(searchIssuesSuccess({ issues: formattedsearchIssues }));
  } catch (error) {
    yield put(searchIssuesFailure({ error }));
  }
}

export function* saveInfoSaga({ payload }) {
  const {
    requestBody: { name, value, body, repo, language },
  } = payload;
  const query = `
  mutation{
    createIssue(
      issueInput: {
        body: ${JSON.stringify(body)},
        language: "${language}",
        name: "${name}",
        repo: "${repo}",
        value: ${value},
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

export function* upvoteIssuesSaga({ payload }) {
  const { itemId } = payload;

  const getIssueQuery = `
  query {
    oneIssue(id: "${itemId}") {
      __typename
      ... on Issue {
        rep
      }
      ... on Error {
        message
      }
    }
  }
  `;

  try {
    const getIssue = JSON.stringify({
      query: getIssueQuery,
      variables: {},
    });
    const {
      data: {
        oneIssue: { rep },
      },
    } = yield call(post, '/graphql', getIssue);

    const updateIssueQuery = `
      mutation {
        transformIssue(id: "${itemId}", issueInput:{rep:${rep + 1} }) {
          id,
          rep
        }
      }
    `;

    const updateIssue = JSON.stringify({
      query: updateIssueQuery,
      variables: {},
    });

    const {
      data: { transformIssue },
    } = yield call(post, '/graphql', updateIssue);

    yield put(upvoteIssueSuccess(transformIssue));
  } catch (error) {
    yield put(upvoteIssueFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(DELETE_ISSUE, deleteIssueSaga);
  yield takeLatest(FETCH_ISSUES, fetchIssuesSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
  yield takeLatest(SEARCH_ISSUES, searchIssuesSaga);
  yield takeLatest(UPVOTE_ISSUE, upvoteIssuesSaga);
  yield takeLatest(FETCH_ISSUE_DETAIL, fetchIssueDetailSaga);
}
