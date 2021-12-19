import {
  CHANGE_INPUT,
  CHANGE_SKILL_LEVEL,
  CLEAR_ALERTS,
  CLOSE_MODAL_STATE,
  DELETE_SKILL,
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS,
  FETCH_USER_DASHBOARD_FAILURE,
  FETCH_USER_DASHBOARD_SUCCESS,
  FETCH_USER_DASHBOARD,
  FETCH_USER_RESPONSE_FAILURE,
  FETCH_USER_RESPONSE_SUCCESS,
  FETCH_USER_RESPONSE,
  INPUT_ERROR,
  OPEN_MODAL_STATE,
  RESET_FORM_STATE,
  SET_HIRING_STATUS_FAILURE,
  SET_HIRING_STATUS_SUCCESS,
  SET_HIRING_STATUS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_RESPONSES_FAILURE,
  UPDATE_USER_RESPONSES_SUCCESS,
  UPDATE_USER_RESPONSES,
  UPDATE_USER_SUCCESS,
  UPDATE_USER,
} from './constants';

export function changeInput(payload) {
  return {
    payload,
    type: CHANGE_INPUT,
  };
}

export function changeSkillLevel(payload) {
  return {
    payload,
    type: CHANGE_SKILL_LEVEL,
  };
}

export function clearAlerts() {
  return { type: CLEAR_ALERTS };
}

export function closeModalState() {
  return { type: CLOSE_MODAL_STATE };
}

export function deleteSkill(payload) {
  return {
    payload,
    type: DELETE_SKILL,
  };
}

export function fetchQuestionsFailure(payload) {
  return {
    payload,
    type: FETCH_QUESTIONS_FAILURE,
  };
}

export function fetchQuestionsSuccess(payload) {
  return {
    payload,
    type: FETCH_QUESTIONS_SUCCESS,
  };
}

export function fetchQuestions(payload) {
  return {
    payload,
    type: FETCH_QUESTIONS,
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

export function fetchUserDashboard() {
  return { type: FETCH_USER_DASHBOARD };
}

export function fetchUserResponseFailure(payload) {
  return {
    payload,
    type: FETCH_USER_RESPONSE_FAILURE,
  };
}

export function fetchUserResponseSuccess(payload) {
  return {
    payload,
    type: FETCH_USER_RESPONSE_SUCCESS,
  };
}

export function fetchUserResponse() {
  return { type: FETCH_USER_RESPONSE };
}

export function inputError(payload) {
  return {
    payload,
    type: INPUT_ERROR,
  };
}

export function openModalState(payload) {
  return {
    payload,
    type: OPEN_MODAL_STATE,
  };
}

export function resetFormState() {
  return { type: RESET_FORM_STATE };
}

export function setHiringStatusFailure(payload) {
  return {
    payload,
    type: SET_HIRING_STATUS_FAILURE,
  };
}

export function setHiringStatusSuccess(payload) {
  return {
    payload,
    type: SET_HIRING_STATUS_SUCCESS,
  };
}

export function setHiringStatus(payload) {
  return {
    payload,
    type: SET_HIRING_STATUS,
  };
}

export function updateUserFailure(payload) {
  return {
    payload,
    type: UPDATE_USER_FAILURE,
  };
}

export function updateUserResponsesFailure(payload) {
  return {
    payload,
    type: UPDATE_USER_RESPONSES_FAILURE,
  };
}

export function updateUserResponsesSuccess() {
  return { type: UPDATE_USER_RESPONSES_SUCCESS };
}

export function updateUserResponses(payload) {
  return {
    payload,
    type: UPDATE_USER_RESPONSES,
  };
}

export function updateUserSuccess() {
  return { type: UPDATE_USER_SUCCESS };
}

export function updateUser(payload) {
  return {
    payload,
    type: UPDATE_USER,
  };
}
