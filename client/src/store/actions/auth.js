import axios from 'axios'; // Burada kendi axios instance'imiz degil, normal axios kullandik
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH
} from './types';

export const authStart = () => {
  return { type: AUTH_START };
};

export const authSuccess = (token, userId) => {
  return { type: AUTH_SUCCESS, idToken: token, userId };
};

export const authFail = error => {
  return { type: AUTH_FAIL, error };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return { type: AUTH_LOGOUT };
};

export const checkAuthTimeout = expirationTimeInSeconds => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTimeInSeconds * 1000); //seconds to milliseconds
  };
};

// isSignUp parametresine gerek kalmadi. Login disinda SignUp icin farkli bir sayfa yapabiliriz ileride.
export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());

    const url = 'http://localhost:8080/authenticate';
    const authData = { username: 't2', password: password };

    axios
      .post(url, authData)
      .then(response => {
        console.log('[Autherization response]: ', response);

        const expirationDate = new Date(
          new Date().getTime() + response.data.expirationTimeInSeconds * 1000
        );
        console.log('[expirationDate]', expirationDate);

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.userId);
        dispatch(authSuccess(response.data.token, response.data.userId));
        dispatch(checkAuthTimeout(response.data.expirationTimeInSeconds));
      })
      .catch(err => {
        // dispatch(authFail(err.response.data.error));
        console.log('[Autherization response error]: ', err);
      });

    // dispatch(signIn(email));
  };
};

export const setAuthRedirectPath = path => {
  return { type: SET_AUTH_REDIRECT_PATH, path };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    // console.log('[authCheckState actionCreator] token: ', token);

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        // console.log('[authCheckState actionCreator] : Auth Success!!!');
        const userId = +localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
