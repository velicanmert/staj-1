import views from '../../apis/views';
import { headerWithToken } from '../../apis/apiUtil';
import history from '../../history';
import {
  CREATE_VIEW,
  FETCH_VIEWS,
  FETCH_VIEW,
  EDIT_VIEW,
  DELETE_VIEW
} from './types';

export const createView = (formValues, userId, token) => async (
  dispatch,
  getState
) => {
  // const { userId } = getState().auth;
  // Action Creator'da getState kullanilabiliyor ama tavsiye edilmiyor. Bu fonksiyona gereken bilgiyi parametre olarak gondermek daha iyi. Buradaki logic cok basit tutulmali.
  // console.log('[createView actionCreator formValues]: ', formValues);
  // console.log('[createView actionCreator userId]: ', userId);
  // console.log('[createView actionCreator token]: ', token);
  const response = await views.post(
    '/views',
    { ...formValues, userId },
    {
      headers: headerWithToken(token)
    }
  );

  dispatch({ type: CREATE_VIEW, payload: response.data });

  // Do some programmatic navigation here. We are forcibly routing the user to a page.
  history.push('/views');
};

export const fetchViews = token => async dispatch => {
  const response = await views.get('/views', {
    headers: headerWithToken(token)
  });
  // console.log('[fetchViews actionCreator]: ', response.data);
  dispatch({ type: FETCH_VIEWS, payload: response.data });
};

export const fetchView = (id, token) => async dispatch => {
  const response = await views.get(`/views/${id}`, {
    headers: headerWithToken(token)
  });
  // console.log('[fetchView actionCreator]: ', response.data);

  dispatch({ type: FETCH_VIEW, payload: response.data });
};

// For RESTFul APIs usually PUT replaces ALL the properties of a record.
// If we need to edit only SOME properties of a record, we should use
// PATCH instead of PUT. The implementations of PUT on your backend server
// might not be similar to this, but usually in convention it is so.
// By the way, the 'id' property is usually immune to this problem but not
// always.
export const editView = (id, formValues, token) => async dispatch => {
  // console.log('[editView  actionCreator] formValues: ', formValues);

  // const response = await views.put(`/views/${id}`, formValues);
  // Instead of put, let's use patch:
  // const response = await views.patch(`/views/${id}`, formValues);
  const response = await views.put(`/views/${id}`, formValues, {
    headers: headerWithToken(token)
  });

  dispatch({ type: EDIT_VIEW, payload: response.data });

  // Do some programmatic navigation here. We are forcibly routing the user to a page.
  history.push('/views');
};

// Delete icin Rest Api bize bir response donmuyor convention olarak.
export const deleteView = (id, token) => async dispatch => {
  await views.delete(`/views/${id}`, {
    headers: headerWithToken(token)
  });

  dispatch({ type: DELETE_VIEW, payload: id });

  // Do some programmatic navigation here. We are forcibly routing the user to a page.
  history.push('/views');
};
