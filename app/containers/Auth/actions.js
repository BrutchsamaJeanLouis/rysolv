import {
  FETCH_ACTIVE_USER_FAILURE,
  FETCH_ACTIVE_USER_SUCCESS,
  FETCH_ACTIVE_USER,
  SEARCH_ORGANIZATIONS_FAILURE,
  SEARCH_ORGANIZATIONS_SUCCESS,
  SEARCH_ORGANIZATIONS,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNIN,
  SIGNOUT_FAILURE,
  SIGNOUT_SUCCESS,
  SIGNOUT,
  UPDATE_ACTIVE_USER,
} from './constants';

export function fetchActiveUserFailure(payload) {
  return {
    payload,
    type: FETCH_ACTIVE_USER_FAILURE,
  };
}

export function fetchActiveUserSuccess(payload) {
  return {
    payload,
    type: FETCH_ACTIVE_USER_SUCCESS,
  };
}

export function fetchActiveUser(payload) {
  return {
    payload,
    type: FETCH_ACTIVE_USER,
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

export function signinFailure(payload) {
  return {
    payload,
    type: SIGNIN_FAILURE,
  };
}

export function signinSuccess(payload) {
  return {
    payload,
    type: SIGNIN_SUCCESS,
  };
}

export function signin(payload) {
  return {
    payload,
    type: SIGNIN,
  };
}

export function signoutFailure(payload) {
  return {
    payload,
    type: SIGNOUT_FAILURE,
  };
}

export function signoutSuccess(payload) {
  return {
    payload,
    type: SIGNOUT_SUCCESS,
  };
}

export function signout(payload) {
  return {
    payload,
    type: SIGNOUT,
  };
}

export function updateActiveUser(payload) {
  return {
    payload,
    type: UPDATE_ACTIVE_USER,
  };
}
