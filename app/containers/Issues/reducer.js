import produce from 'immer';
import {
  CLEAR_ALERTS,
  DELETE_ISSUE_FAILURE,
  DELETE_ISSUE_SUCCESS,
  DELETE_ISSUE,
  FETCH_ISSUES_FAILURE,
  FETCH_ISSUES_SUCCESS,
  FETCH_ISSUES,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  issues: [],
  loading: {
    issues: false,
    deleteIssue: false,
  },
  error: {
    issues: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const issuesReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
    case DELETE_ISSUE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.deleteIssue = false;
      break;
    }
    case DELETE_ISSUE_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading.deleteIssue = false;
      break;
    }
    case DELETE_ISSUE: {
      draft.loading.deleteIssue = true;
      break;
    }
    case FETCH_ISSUES_FAILURE: {
      const { error } = payload;
      draft.error.issues = error;
      draft.loading.issues = false;
      break;
    }
    case FETCH_ISSUES_SUCCESS: {
      const { issues } = payload;
      draft.issues = issues;
      draft.loading.issues = false;
      break;
    }
    case FETCH_ISSUES: {
      draft.loading.issues = true;
      break;
    }
  }
}, initialState);

export default issuesReducer;
