/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import { RESET_USER_STATE } from 'containers/Main/constants';

import {
  CHANGE_INPUT,
  CHANGE_VIEW,
  CLEAR_ALERTS,
  FETCH_CONTRACT_FAILURE,
  FETCH_CONTRACT_SUCCESS,
  FETCH_CONTRACT,
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS,
  INPUT_ERROR,
  RESET_STATE,
  SUBMIT_COMPANY_RESPONSE_FAILURE,
  SUBMIT_COMPANY_RESPONSE_SUCCESS,
  SUBMIT_COMPANY_RESPONSE,
  SUBMIT_CONTRACT_ACCEPTED_FAILURE,
  SUBMIT_CONTRACT_ACCEPTED_SUCCESS,
  SUBMIT_CONTRACT_ACCEPTED,
} from './constants';

export const initialState = {
  alerts: { error: false },
  contract: {
    body: '',
    key: '',
    title: '',
  },
  error: null,
  forms: {
    company: {
      description: '',
      location: {},
      name: '',
      size: '',
      website: '',
    },
    contract: { contractAccepted: false },
  },
  formErrors: {
    company: {
      description: '',
      location: '',
      name: '',
      size: '',
      website: '',
    },
  },
  loading: {
    fetchContract: true,
    fetchQuestions: true,
    submitCompanyResponse: false,
    submitContract: false,
  },
  questions: [],
  view: 0,
};

const companySignUpReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CHANGE_INPUT: {
      const { field, form, value } = payload;
      draft.forms[form][field] = value;
      break;
    }
    case CHANGE_VIEW: {
      const { view } = payload;
      draft.view = view;
      break;
    }
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
    case FETCH_CONTRACT_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading.fetchContract = false;
      break;
    }
    case FETCH_CONTRACT_SUCCESS: {
      const { contract } = payload;
      draft.contract = contract;
      draft.loading.fetchContract = false;
      break;
    }
    case FETCH_CONTRACT: {
      draft.error = null;
      draft.loading.fetchContract = true;
      break;
    }
    case FETCH_QUESTIONS_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading.fetchQuestions = false;
      break;
    }
    case FETCH_QUESTIONS_SUCCESS: {
      const { questions } = payload;
      draft.loading.fetchQuestions = false;
      draft.questions = questions;
      break;
    }
    case FETCH_QUESTIONS: {
      draft.error = null;
      draft.loading.fetchQuestions = true;
      break;
    }
    case INPUT_ERROR: {
      const { errors, form } = payload;
      const fields = Object.keys(errors);
      fields.forEach(field => {
        draft.formErrors[form][field] = errors[field] || '';
      });
      break;
    }
    case RESET_STATE: {
      return initialState;
    }
    case RESET_USER_STATE: {
      return initialState;
    }
    case SUBMIT_COMPANY_RESPONSE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.submitCompanyResponse = false;
      break;
    }
    case SUBMIT_COMPANY_RESPONSE_SUCCESS: {
      draft.loading.submitCompanyResponse = false;
      break;
    }
    case SUBMIT_COMPANY_RESPONSE: {
      draft.alerts = initialState.alerts;
      draft.loading.submitCompanyResponse = true;
      break;
    }
    case SUBMIT_CONTRACT_ACCEPTED_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.submitContract = false;
      break;
    }
    case SUBMIT_CONTRACT_ACCEPTED_SUCCESS: {
      draft.loading.submitContract = false;
      break;
    }
    case SUBMIT_CONTRACT_ACCEPTED: {
      draft.alerts = initialState.alerts;
      draft.loading.submitContract = true;
      break;
    }
  }
}, initialState);

export default companySignUpReducer;
