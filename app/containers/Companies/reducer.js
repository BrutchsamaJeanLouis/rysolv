/* eslint-disable array-callback-return */
import produce from 'immer';
import remove from 'lodash/remove';

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
  SEARCH_COMPANIES_FAILURE,
  SEARCH_COMPANIES_SUCCESS,
  SEARCH_COMPANIES,
  SEARCH_CONTRIBUTORS,
  SEARCH_ISSUES,
  UPDATE_INFO_FAILURE,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO,
  VERIFY_INFO,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  companies: [],
  company: {},
  data: {
    companyUrl: { error: '', value: '' },
    description: { error: '', value: '' },
    repoUrl: { error: '', value: '' },
    logo: { error: '', value: '' },
    importUrl: { error: '', value: '' },
    name: { error: '', value: '' },
    verified: { error: '', value: false },
  },
  editInfo: {
    id: { error: '', value: '' },
    createdDate: { error: '', value: '' },
    description: { error: '', value: '' },
    issues: { error: '', value: '' },
    logo: { error: '', value: '' },
    modifiedDate: { error: '', value: '' },
    name: { error: '', value: '' },
    repoUrl: { error: '', value: '' },
    verified: { error: '', value: '' },
    companyUrl: { error: '', value: '' },
  },
  loading: {
    addCompany: false,
    companies: false,
    deleteCompany: false,
    fetchCompany: false,
    saveCompany: false,
    searchCompanies: false,
    searchContributors: false,
    searchIssues: false,
    updateCompany: false,
  },
  error: {
    companies: false,
    fetchCompany: false,
    searchCompanies: false,
  },
  isVerified: false,
  search: {
    companyInput: { error: '', value: '' },
    contributorInput: { error: '', value: '' },
    issueInput: { error: '', value: '' },
  },
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
      const { itemId, message } = payload;
      draft.alerts.success = { message };
      draft.loading.deleteCompany = false;
      remove(draft.companies, ({ id }) => id === itemId);
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
      const { getOrganizations } = payload;
      draft.companies = getOrganizations;
      draft.loading.companies = false;
      break;
    }
    case FETCH_COMPANIES: {
      draft.loading.companies = true;
      break;
    }
    case FETCH_INFO_FAILURE: {
      const { error } = payload;
      draft.error.fetchCompany = error;
      draft.loading.fetchCompany = false;
      break;
    }
    case FETCH_INFO_SUCCESS: {
      const { company } = payload;
      Object.keys(company).forEach(detail => {
        if (draft.editInfo[detail]) {
          draft.editInfo[detail].value = company[detail];
        }
      });
      draft.company = company;
      draft.loading.fetchCompany = false;
      break;
    }
    case FETCH_INFO: {
      draft.loading.fetchCompany = true;
      break;
    }
    case INCREMENT_STEP: {
      const { step, view } = payload;
      draft.step[view] = step;
      break;
    }
    case INPUT_CHANGE: {
      const { field, form, value } = payload;
      draft[form][field].value = value;
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
    case SEARCH_COMPANIES_FAILURE: {
      const { error } = payload;
      draft.error.searchCompanies = error;
      draft.loading.searchCompanies = false;
      break;
    }
    case SEARCH_COMPANIES_SUCCESS: {
      const { companies } = payload;
      draft.companies = companies || null;
      draft.loading.searchCompanies = false;
      break;
    }
    case SEARCH_COMPANIES: {
      draft.loading.searchCompanies = true;
      break;
    }
    case SEARCH_CONTRIBUTORS: {
      draft.loading.searchIssues = true;
      break;
    }
    case SEARCH_ISSUES: {
      draft.loading.searchIssues = true;
      break;
    }
    case UPDATE_INFO_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.updateCompany = false;
      break;
    }
    case UPDATE_INFO_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading.updateCompany = false;
      break;
    }
    case UPDATE_INFO: {
      draft.loading.updateCompany = true;
      break;
    }
    case VERIFY_INFO: {
      draft.isVerified = !draft.isVerified;
      break;
    }
  }
}, initialState);

export default companiesReducer;
