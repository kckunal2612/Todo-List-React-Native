import {SET_APP_USER} from '../types/types';

const INITIAL_STATE = {
  initializing: true,
  user: null,
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_APP_USER:
      return {
        ...state,
        initializing: false,
        user: action.payload,
      };
    default:
      return INITIAL_STATE;
  }
};

export default appReducer;
