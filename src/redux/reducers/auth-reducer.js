import {AuthType} from '../action-types/auth-types';

const initialState = {
  currentUser: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthType.SET_CURRENT_USER: {
      const {currentUser} = action;
      return {
        ...state,
        currentUser,
      };
    }
    default: {
      return state;
    }
  }
};
