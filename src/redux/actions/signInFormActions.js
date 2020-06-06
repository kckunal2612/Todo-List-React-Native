import {
  BEGIN_AUTHENTICATION,
  SET_AUTHENTICATION_SUCCESSFUL,
  SET_AUTHENTICATION_FAILED,
  START_SIGN_IN_ASYNC,
  START_SIGN_IN_ASYNC_FACEBOOK,
} from '../types/types';

export const startSignInAsync = (email, password) => {
  return {
    type: START_SIGN_IN_ASYNC,
    email: email,
    password: password,
  };
};

export const startFacebookSignInAsync = () => {
  return {
    type: START_SIGN_IN_ASYNC_FACEBOOK,
  };
};

export const beginAuthentication = () => {
  return {
    type: BEGIN_AUTHENTICATION,
  };
};

export const setAuthenticationSuccessful = () => {
  return {
    type: SET_AUTHENTICATION_SUCCESSFUL,
  };
};

export const setAuthenticationFailed = (errorMessage) => {
  return {
    type: SET_AUTHENTICATION_FAILED,
    payload: errorMessage,
  };
};
