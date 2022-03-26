import {AuthType} from '../action-types/auth-types';

export function setCurrentUser(currentUser) {
  return {
    type: AuthType.SET_CURRENT_USER,
    currentUser,
  };
}
