import {
  CLEAR_ALERTS,
  CLEAR_FORM,
  DELETE_ORGANIZATION_FAILURE,
  DELETE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATIONS,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
  SAVE_INFO_FAILURE,
  SAVE_INFO_SUCCESS,
  SAVE_INFO,
  SEARCH_ORGANIZATIONS_FAILURE,
  SEARCH_ORGANIZATIONS_SUCCESS,
  SEARCH_ORGANIZATIONS,
  UPDATE_INFO_FAILURE,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO,
  UPVOTE_ISSUE_FAILURE,
  UPVOTE_ISSUE_SUCCESS,
  UPVOTE_ISSUE,
  VERIFY_INFO,
} from './constants';

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

export function deleteOrganizationFailure(payload) {
  return {
    payload,
    type: DELETE_ORGANIZATION_FAILURE,
  };
}

export function deleteOrganizationSuccess(payload) {
  return {
    payload,
    type: DELETE_ORGANIZATION_SUCCESS,
  };
}

export function deleteOrganization(payload) {
  return {
    payload,
    type: DELETE_ORGANIZATION,
  };
}

export function fetchOrganizationsFailure(payload) {
  return {
    payload,
    type: FETCH_ORGANIZATIONS_FAILURE,
  };
}

export function fetchOrganizationsSuccess(payload) {
  return {
    payload,
    type: FETCH_ORGANIZATIONS_SUCCESS,
  };
}

export function fetchOrganizations() {
  return {
    type: FETCH_ORGANIZATIONS,
  };
}

export function fetchInfoFailure(payload) {
  return {
    payload,
    type: FETCH_INFO_FAILURE,
  };
}

export function fetchInfoSuccess(payload) {
  return {
    payload,
    type: FETCH_INFO_SUCCESS,
  };
}

export function fetchInfo(payload) {
  return {
    payload,
    type: FETCH_INFO,
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

export function searchOrganizationsFailure(payload) {
  return {
    payload,
    type: SEARCH_ORGANIZATIONS_FAILURE,
  };
}

export function searchOrganizationsSuccess(payload) {
  return {
    payload,
    type: SEARCH_ORGANIZATIONS_SUCCESS,
  };
}

export function searchOrganizations(payload) {
  return {
    payload,
    type: SEARCH_ORGANIZATIONS,
  };
}

export function updateInfoFailure(payload) {
  return {
    payload,
    type: UPDATE_INFO_FAILURE,
  };
}

export function updateInfoSuccess(payload) {
  return {
    payload,
    type: UPDATE_INFO_SUCCESS,
  };
}

export function updateInfo(payload) {
  return {
    payload,
    type: UPDATE_INFO,
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

export function upvoteIssue(payload) {
  return {
    payload,
    type: UPVOTE_ISSUE,
  };
}

export function verifyInfo() {
  return { type: VERIFY_INFO };
}
