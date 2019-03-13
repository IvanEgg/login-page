import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.LISTUSERS_REQUEST:
      return {
        loading: true
      };
    case userConstants.LISTUSERS_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.LISTUSERS_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}