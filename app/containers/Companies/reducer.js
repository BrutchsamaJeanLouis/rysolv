/* eslint-disable array-callback-return */
import produce from 'immer';
import {
  CLEAR_ALERTS,
  CLEAR_FORM,
  DELETE_COMPANY_FAILURE,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY,
  FETCH_COMPANIES_FAILURE,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
  SAVE_INFO_FAILURE,
  SAVE_INFO_SUCCESS,
  SAVE_INFO,
  VERIFY_INFO,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  companies: [],
  data: {
    companyUrl: { error: '', value: '' },
    description: { error: '', value: '' },
    githubUrl: { error: '', value: '' },
    icon: { error: '', value: '' },
    importUrl: { error: '', value: '' },
    name: { error: '', value: '' },
  },
  loading: {
    addCompany: false,
    companies: false,
    deleteCompany: false,
    editCompany: false,
    saveCompany: false,
  },
  error: {
    companies: false,
    editCompany: false,
  },
  isVerified: false,
  step: {
    addCompany: 1,
    editCompany: 1,
  },
};

/* eslint-disable default-case, no-param-reassign */
const companiesReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
    case CLEAR_FORM: {
      draft.data = initialState.data;
      draft.isVerified = initialState.isVerified;
      break;
    }
    case DELETE_COMPANY_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.deleteCompany = false;
      break;
    }
    case DELETE_COMPANY_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading.deleteCompany = false;
      break;
    }
    case DELETE_COMPANY: {
      draft.loading.deleteCompany = true;
      break;
    }
    case FETCH_COMPANIES_FAILURE: {
      const { error } = payload;
      draft.error.companies = error;
      draft.loading.companies = false;
      break;
    }
    case FETCH_COMPANIES_SUCCESS: {
      const { companies } = payload;
      draft.companies = companies;
      draft.loading.companies = false;
      break;
    }
    case FETCH_COMPANIES: {
      draft.loading.companies = true;
      break;
    }
    case FETCH_INFO_FAILURE: {
      const { error } = payload;
      draft.error.editCompany = error;
      draft.loading.editCompany = false;
      break;
    }
    case FETCH_INFO_SUCCESS: {
      const { company } = payload;
      company.forEach(detail => {
        draft.data[detail].value = company[detail];
      });
      draft.loading.editCompany = false;
      break;
    }
    case FETCH_INFO: {
      draft.loading.editCompany = true;
      break;
    }
    case INCREMENT_STEP: {
      const { step, view } = payload;
      draft.step[view] = step;
      break;
    }
    case INPUT_CHANGE: {
      const { field, value } = payload;
      draft.data[field].value = value;
      break;
    }
    case INPUT_ERROR: {
      const { errors } = payload;
      const fields = Object.keys(errors);
      fields.forEach(field => {
        draft.data[field].error = errors[field] || '';
      });
      break;
    }
    case SAVE_INFO_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.addCompany = false;
      break;
    }
    case SAVE_INFO_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading.addCompany = false;
      break;
    }
    case SAVE_INFO: {
      draft.loading.addCompany = true;
      break;
    }
    case VERIFY_INFO: {
      draft.isVerified = !draft.isVerified;
      break;
    }
  }
}, initialState);

export default companiesReducer;
