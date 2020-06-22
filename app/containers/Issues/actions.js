import {
  ADD_ATTEMPT_FAILURE,
  ADD_ATTEMPT_SUCCESS,
  ADD_ATTEMPT,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT,
  ADD_WATCH_FAILURE,
  ADD_WATCH_SUCCESS,
  CHANGE_ISSUE_FILTER,
  CHANGE_ISSUE_SEARCH,
  CLEAR_ALERTS,
  CLEAR_FORM,
  CLEAR_ORGANIZATION,
  CLOSE_ISSUE_FAILURE,
  CLOSE_ISSUE_SUCCESS,
  CLOSE_ISSUE,
  CLOSE_MODAL_STATE,
  EDIT_ISSUE_FAILURE,
  EDIT_ISSUE_SUCCESS,
  EDIT_ISSUE,
  FETCH_ISSUE_DETAIL_FAILURE,
  FETCH_ISSUE_DETAIL_SUCCESS,
  FETCH_ISSUE_DETAIL,
  FETCH_ISSUES_FAILURE,
  FETCH_ISSUES_SUCCESS,
  FETCH_ISSUES,
  IMPORT_ISSUE_FAILURE,
  IMPORT_ISSUE_SUCCESS,
  IMPORT_ISSUE,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
  OPEN_MODAL_STATE,
  SAVE_INFO_FAILURE,
  SAVE_INFO_SUCCESS,
  SAVE_INFO,
  SEARCH_ISSUES_FAILURE,
  SEARCH_ISSUES_SUCCESS,
  SEARCH_ISSUES,
  SUBMIT_ACCOUNT_PAYMENT_FAILURE,
  SUBMIT_ACCOUNT_PAYMENT_SUCCESS,
  SUBMIT_ACCOUNT_PAYMENT,
  UPDATE_ORGANIZATION,
  UPVOTE_ISSUE_FAILURE,
  UPVOTE_ISSUE_SUCCESS,
  UPVOTE_ISSUE,
  VERIFY_INFO,
} from './constants';

export function addAttemptFailure(payload) {
  return {
    payload,
    type: ADD_ATTEMPT_FAILURE,
  };
}

export function addAttemptSuccess(payload) {
  return {
    payload,
    type: ADD_ATTEMPT_SUCCESS,
  };
}

export function addAttempt(payload) {
  return {
    payload,
    type: ADD_ATTEMPT,
  };
}

export function addComment(payload) {
  return {
    payload,
    type: ADD_COMMENT,
  };
}

export function addCommentFailure(payload) {
  return {
    payload,
    type: ADD_COMMENT_FAILURE,
  };
}

export function addCommentSuccess(payload) {
  return {
    payload,
    type: ADD_COMMENT_SUCCESS,
  };
}

export function addWatchFailure(payload) {
  return {
    payload,
    type: ADD_WATCH_FAILURE,
  };
}

export function addWatchSuccess(payload) {
  return {
    payload,
    type: ADD_WATCH_SUCCESS,
  };
}

export function changeIssueFilter(payload) {
  return {
    payload,
    type: CHANGE_ISSUE_FILTER,
  };
}

export function changeIssueSearch(payload) {
  return {
    payload,
    type: CHANGE_ISSUE_SEARCH,
  };
}

export function clearAlerts() {
  return {
    type: CLEAR_ALERTS,
  };
}

export function clearForm() {
  return {
    type: CLEAR_FORM,
  };
}

export function clearOrganization(payload) {
  return {
    payload,
    type: CLEAR_ORGANIZATION,
  };
}

export function closeIssueFailure(payload) {
  return {
    payload,
    type: CLOSE_ISSUE_FAILURE,
  };
}

export function closeIssueSuccess(payload) {
  return {
    payload,
    type: CLOSE_ISSUE_SUCCESS,
  };
}

export function closeIssue(payload) {
  return {
    payload,
    type: CLOSE_ISSUE,
  };
}

export function closeIssueModalState() {
  return {
    type: CLOSE_MODAL_STATE,
  };
}

export function editIssueFailure(payload) {
  return {
    payload,
    type: EDIT_ISSUE_FAILURE,
  };
}

export function editIssueSuccess(payload) {
  return {
    payload,
    type: EDIT_ISSUE_SUCCESS,
  };
}

export function editIssue(payload) {
  return {
    payload,
    type: EDIT_ISSUE,
  };
}

export function fetchIssuesFailure(payload) {
  return {
    payload,
    type: FETCH_ISSUES_FAILURE,
  };
}

export function fetchIssuesSuccess(payload) {
  return {
    payload,
    type: FETCH_ISSUES_SUCCESS,
  };
}

export function fetchIssues() {
  return {
    type: FETCH_ISSUES,
  };
}

export function fetchIssueDetailFailure(payload) {
  return {
    payload,
    type: FETCH_ISSUE_DETAIL_FAILURE,
  };
}

export function fetchIssueDetailSuccess(payload) {
  return {
    payload,
    type: FETCH_ISSUE_DETAIL_SUCCESS,
  };
}

export function fetchIssueDetail(payload) {
  return {
    payload,
    type: FETCH_ISSUE_DETAIL,
  };
}

export function importIssueFailure(payload) {
  return {
    payload,
    type: IMPORT_ISSUE_FAILURE,
  };
}

export function importIssueSuccess(payload) {
  return {
    payload,
    type: IMPORT_ISSUE_SUCCESS,
  };
}

export function importIssue(payload) {
  return {
    payload,
    type: IMPORT_ISSUE,
  };
}

export function incrementStep(payload) {
  return {
    payload,
    type: INCREMENT_STEP,
  };
}

export function inputChange(payload) {
  return {
    payload,
    type: INPUT_CHANGE,
  };
}

export function inputError(payload) {
  return {
    payload,
    type: INPUT_ERROR,
  };
}

export function openIssueModalState(payload) {
  return {
    payload,
    type: OPEN_MODAL_STATE,
  };
}

export function saveInfoFailure(payload) {
  return {
    payload,
    type: SAVE_INFO_FAILURE,
  };
}

export function saveInfoSuccess(payload) {
  return {
    payload,
    type: SAVE_INFO_SUCCESS,
  };
}

export function saveInfo(payload) {
  return {
    payload,
    type: SAVE_INFO,
  };
}

export function searchIssuesFailure(payload) {
  return {
    payload,
    type: SEARCH_ISSUES_FAILURE,
  };
}

export function searchIssuesSuccess(payload) {
  return {
    payload,
    type: SEARCH_ISSUES_SUCCESS,
  };
}

export function searchIssues(payload) {
  return {
    payload,
    type: SEARCH_ISSUES,
  };
}

export function submitAccountPaymentFailure(payload) {
  return {
    payload,
    type: SUBMIT_ACCOUNT_PAYMENT_FAILURE,
  };
}

export function submitAccountPaymentSuccess(payload) {
  return {
    payload,
    type: SUBMIT_ACCOUNT_PAYMENT_SUCCESS,
  };
}

export function submitAccountPayment(payload) {
  return {
    payload,
    type: SUBMIT_ACCOUNT_PAYMENT,
  };
}

export function updateOrganization(payload) {
  return {
    payload,
    type: UPDATE_ORGANIZATION,
  };
}

export function upvoteIssue(payload) {
  return {
    payload,
    type: UPVOTE_ISSUE,
  };
}

export function upvoteIssueFailure(payload) {
  return {
    payload,
    type: UPVOTE_ISSUE_FAILURE,
  };
}

export function upvoteIssueSuccess(payload) {
  return {
    payload,
    type: UPVOTE_ISSUE_SUCCESS,
  };
}

export function verifyInfo() {
  return { type: VERIFY_INFO };
}
