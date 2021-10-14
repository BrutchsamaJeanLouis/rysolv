import {
  DISMISS_BANNER_FAILURE,
  DISMISS_BANNER_SUCCESS,
  DISMISS_BANNER,
  FETCH_USER_DASHBOARD_FAILURE,
  FETCH_USER_DASHBOARD_SUCCESS,
  FETCH_USER_DASHBOARD,
} from './constants';

export function dismissBannerFailure(payload) {
  return {
    payload,
    type: DISMISS_BANNER_FAILURE,
  };
}

export function dismissBannerSuccess(payload) {
  return {
    payload,
    type: DISMISS_BANNER_SUCCESS,
  };
}

export function dismissBanner() {
  return {
    type: DISMISS_BANNER,
  };
}

export function fetchUserDashboardFailure(payload) {
  return {
    payload,
    type: FETCH_USER_DASHBOARD_FAILURE,
  };
}

export function fetchUserDashboardSuccess(payload) {
  return {
    payload,
    type: FETCH_USER_DASHBOARD_SUCCESS,
  };
}

export function fetchUserDashboard(payload) {
  return {
    payload,
    type: FETCH_USER_DASHBOARD,
  };
}
