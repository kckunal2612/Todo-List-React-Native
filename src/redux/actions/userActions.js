import {SET_APP_USER, RESET_USER} from '../types/types';

export const setAppUser = (user) => {
  return {
    type: SET_APP_USER,
    payload: user,
  };
};

export const clearUser = () => {
  return {
    type: RESET_USER,
  };
};
