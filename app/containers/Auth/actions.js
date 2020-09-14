import {
  CLEAR_ALERTS,
  FETCH_ACTIVE_USER_FAILURE,
  FETCH_ACTIVE_USER_SUCCESS,
  FETCH_ACTIVE_USER,
  FETCH_USER_SESSION_FAILURE,
  FETCH_USER_SESSION_SUCCESS,
  FETCH_USER_SESSION,
  RESEND_SIGN_UP,
  RESET_ROUTE,
  SEARCH_ORGANIZATIONS_FAILURE,
  SEARCH_ORGANIZATIONS_SUCCESS,
  SEARCH_ORGANIZATIONS,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_IN,
  SIGN_OUT_FAILURE,
  SIGN_OUT_SUCCESS,
  SIGN_OUT,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP,
  UPDATE_ACTIVE_USER,
  UPVOTE_USER_TEMP,
  USER_ATTEMPTING_TEMP,
  USER_WATCHING_TEMP,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL,
} from './constants';

export function clearAlerts() {
  return {
    type: CLEAR_ALERTS,
  };
}

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

export function fetchUserSessionFailure(payload) {
  return {
    payload,
    type: FETCH_USER_SESSION_FAILURE,
  };
}

export function fetchUserSessionSuccess(payload) {
  return {
    payload,
    type: FETCH_USER_SESSION_SUCCESS,
  };
}

export function fetchUserSession() {
  return {
    type: FETCH_USER_SESSION,
  };
}

export function resendSignUp(payload) {
  return {
    payload,
    type: RESEND_SIGN_UP,
  };
}

export function resetRoute() {
  return { type: RESET_ROUTE };
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

export function signInFailure(payload) {
  return {
    payload,
    type: SIGN_IN_FAILURE,
  };
}

export function signInSuccess(payload) {
  return {
    payload,
    type: SIGN_IN_SUCCESS,
  };
}

export function signIn(payload) {
  return {
    payload,
    type: SIGN_IN,
  };
}

export function signOutFailure() {
  return {
    type: SIGN_OUT_FAILURE,
  };
}

export function signOutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS,
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

export function signUpFailure(payload) {
  return {
    payload,
    type: SIGN_UP_FAILURE,
  };
}

export function signUpSuccess(payload) {
  return {
    payload,
    type: SIGN_UP_SUCCESS,
  };
}

export function signUp(payload) {
  return {
    payload,
    type: SIGN_UP,
  };
}

export function updateActiveUser(payload) {
  return {
    payload,
    type: UPDATE_ACTIVE_USER,
  };
}

export function upvoteUserTemp(payload) {
  return {
    payload,
    type: UPVOTE_USER_TEMP,
  };
}

export function userAttemptingTemp(payload) {
  return {
    payload,
    type: USER_ATTEMPTING_TEMP,
  };
}

export function userWatchingTemp(payload) {
  return {
    payload,
    type: USER_WATCHING_TEMP,
  };
}

export function verifyEmailFailure(payload) {
  return {
    payload,
    type: VERIFY_EMAIL_FAILURE,
  };
}

export function verifyEmailSuccess() {
  return { type: VERIFY_EMAIL_SUCCESS };
}

export function verifyEmail(payload) {
  return {
    payload,
    type: VERIFY_EMAIL,
  };
}
