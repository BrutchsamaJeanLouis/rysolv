import {
  CLEAR_FORM,
  CREATE_PULL_REQUEST_FAILURE,
  CREATE_PULL_REQUEST_SUCCESS,
  CREATE_PULL_REQUEST,
  FETCH_USER_PULL_REQUESTS_FAILURE,
  FETCH_USER_PULL_REQUESTS_SUCCESS,
  FETCH_USER_PULL_REQUESTS,
  HANDLE_STEP,
  IMPORT_PULL_REQUEST_FAILURE,
  IMPORT_PULL_REQUEST_SUCCESS,
  IMPORT_PULL_REQUEST,
  INPUT_CHANGE,
  INPUT_ERROR,
} from './constants';

export function clearForm() {
  return {
    type: CLEAR_FORM,
  };
}

export function createPullRequestFailure(payload) {
  return {
    payload,
    type: CREATE_PULL_REQUEST_FAILURE,
  };
}

export function createPullRequestSuccess(payload) {
  return {
    payload,
    type: CREATE_PULL_REQUEST_SUCCESS,
  };
}

export function createPullRequest(payload) {
  return {
    payload,
    type: CREATE_PULL_REQUEST,
  };
}

export function fetchUserPullRequestsFailure(payload) {
  return {
    payload,
    type: FETCH_USER_PULL_REQUESTS_FAILURE,
  };
}

export function fetchUserPullRequestsSuccess(payload) {
  return {
    payload,
    type: FETCH_USER_PULL_REQUESTS_SUCCESS,
  };
}

export function fetchUserPullRequests(payload) {
  return {
    payload,
    type: FETCH_USER_PULL_REQUESTS,
  };
}

export function handleStep(payload) {
  return {
    payload,
    type: HANDLE_STEP,
  };
}

export function importPullRequestFailure(payload) {
  return {
    payload,
    type: IMPORT_PULL_REQUEST_FAILURE,
  };
}

export function importPullRequestSuccess(payload) {
  return {
    payload,
    type: IMPORT_PULL_REQUEST_SUCCESS,
  };
}

export function importPullRequest(payload) {
  return {
    payload,
    type: IMPORT_PULL_REQUEST,
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
