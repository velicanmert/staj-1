import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH
} from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, error: null, loading: true };

    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        isSignedIn: true,
        error: null,
        loading: false
      };

    case AUTH_FAIL:
      return {
        ...state,
        token: null,
        userId: null,
        isSignedIn: false,
        error: action.error,
        loading: false
      };

    case AUTH_LOGOUT:
      return { ...state, token: null, userId: null, isSignedIn: false };

    case SET_AUTH_REDIRECT_PATH:
      return { ...state, authRedirectPath: action.path };

    default:
      return state;
  }
};
