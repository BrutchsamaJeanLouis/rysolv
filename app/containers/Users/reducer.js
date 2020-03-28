import produce from 'immer';
import {
  CLEAR_ALERTS,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS,
  INPUT_CHANGE,
  SEARCH_USERS_FAILURE,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  error: {
    editUser: false,
    searchUsers: false,
    users: false,
  },
  loading: {
    deleteUser: false,
    editUser: false,
    searchUsers: false,
    users: false,
  },
  search: {
    name: { error: '', value: '' },
  },
  userInfo: {},
  users: [],
};

/* eslint-disable default-case, no-param-reassign */
const usersReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
    case DELETE_USER_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.deleteUser = false;
      break;
    }
    case DELETE_USER_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading.deleteUser = false;
      break;
    }
    case DELETE_USER: {
      draft.loading.deleteUser = true;
      break;
    }
    case FETCH_INFO_FAILURE: {
      const { error } = payload;
      draft.error.editUser = error;
      draft.loading.editUser = false;
      break;
    }
    case FETCH_INFO_SUCCESS: {
      const { user } = payload;
      Object.keys(user).forEach(detail => {
        draft.userInfo[detail].value = user[detail];
      });
      draft.loading.editUser = false;
      break;
    }
    case FETCH_INFO: {
      draft.loading.editUser = true;
      break;
    }
    case FETCH_USERS_FAILURE: {
      const { error } = payload;
      draft.error.users = error;
      draft.loading.users = false;
      break;
    }
    case FETCH_USERS_SUCCESS: {
      const { users } = payload;
      draft.users = users;
      draft.loading.users = false;
      break;
    }
    case FETCH_USERS: {
      draft.loading.users = true;
      break;
    }
    case INPUT_CHANGE: {
      const { field, form, value } = payload;
      draft[form][field].value = value;
      break;
    }
    case SEARCH_USERS_FAILURE: {
      const { error } = payload;
      draft.error.searchUsers = error;
      draft.loading.searchUsers = false;
      break;
    }
    case SEARCH_USERS_SUCCESS: {
      const { users } = payload;
      draft.users = users || null;
      draft.loading.searchUsers = false;
      break;
    }
    case SEARCH_USERS: {
      draft.loading.searchUsers = true;
      break;
    }
  }
}, initialState);

export default usersReducer;
