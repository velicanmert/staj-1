import entities from '../../apis/entities';
import { headerWithToken } from '../../apis/apiUtil';
import history from '../../history';
import {
  CREATE_ENTITY,
  FETCH_ENTITIES,
  FETCH_ENTITY,
  EDIT_ENTITY,
  DELETE_ENTITY
} from './types';

export const createEntity = (formValues, userId, token) => async (
  dispatch,
  getState
) => {
  // const { userId } = getState().auth;
  // Action Creator'da getState kullanilabiliyor ama tavsiye edilmiyor. Bu fonksiyona gereken bilgiyi parametre olarak gondermek daha iyi. Buradaki logic cok basit tutulmali.
  // console.log('[createEntity actionCreator formValues]: ', formValues);
  // console.log('[createEntity actionCreator userId]: ', userId);
  // console.log('[createEntity actionCreator token]: ', token);
  const response = await entities.post(
    '/entities',
    { ...formValues, userId },
    {
      headers: headerWithToken(token)
    }
  );

  dispatch({ type: CREATE_ENTITY, payload: response.data });

  // Do some programmatic navigation here. We are forcibly routing the user to a page.
  history.push('/entities');
};

export const fetchEntities = token => async dispatch => {
  const response = await entities.get('/entities', {
    headers: headerWithToken(token)
  });
  // console.log('[fetchEntities actionCreator]: ', response.data);
  dispatch({ type: FETCH_ENTITIES, payload: response.data });
};

export const fetchEntity = (id, token) => async dispatch => {
  const response = await entities.get(`/entities/${id}`, {
    headers: headerWithToken(token)
  });
  console.log('[fetchEntity actionCreator]: ', response.data);

  dispatch({ type: FETCH_ENTITY, payload: response.data });
};

// For RESTFul APIs usually PUT replaces ALL the properties of a record.
// If we need to edit only SOME properties of a record, we should use
// PATCH instead of PUT. The implementations of PUT on your backend server
// might not be similar to this, but usually in convention it is so.
// By the way, the 'id' property is usually immune to this problem but not
// always.
export const editEntity = (id, formValues, token) => async dispatch => {
  // console.log('[editEntity  actionCreator] formValues: ', formValues);

  // const response = await entities.put(`/entities/${id}`, formValues);
  // Instead of put, let's use patch:
  // const response = await entities.patch(`/entities/${id}`, formValues);
  const response = await entities.put(`/entities/${id}`, formValues, {
    headers: headerWithToken(token)
  });

  dispatch({ type: EDIT_ENTITY, payload: response.data });

  // Do some programmatic navigation here. We are forcibly routing the user to a page.
  history.push('/entities');
};

// Delete icin Rest Api bize bir response donmuyor convention olarak.
export const deleteEntity = (id, token) => async dispatch => {
  await entities.delete(`/entities/${id}`, {
    headers: headerWithToken(token)
  });

  dispatch({ type: DELETE_ENTITY, payload: id });

  // Do some programmatic navigation here. We are forcibly routing the user to a page.
  history.push('/entities');
};
