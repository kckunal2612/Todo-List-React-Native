import {
  BEGIN_AUTHENTICATION,
  SET_AUTHENTICATION_SUCCESSFUL,
  SET_AUTHENTICATION_FAILED,
} from '../types/types';

const INITIAL_STATE = {
  loading: false,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BEGIN_AUTHENTICATION:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_AUTHENTICATION_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SET_AUTHENTICATION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return INITIAL_STATE;
  }
};

export default authReducer;
