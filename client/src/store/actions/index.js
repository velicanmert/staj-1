import features from '../../apis/features';
import history from '../../history';
import {
  CREATE_FEATURE,
  FETCH_FEATURES,
  FETCH_FEATURE,
  EDIT_FEATURE,
  DELETE_FEATURE
} from './types';

export const createFeature = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await features.post('/features', { ...formValues, userId });

  dispatch({ type: CREATE_FEATURE, payload: response.data });

  // Do some programmatic navigation to get the user to the root route.
  // We are forcibly routing the user to the root page.
  history.push('/');
};

export const fetchFeatures = () => async dispatch => {
  const response = await features.get('/features');
  console.log('Inside fetchFeatures AC: ', response.data);
  dispatch({ type: FETCH_FEATURES, payload: response.data });
};

export const fetchFeature = id => async dispatch => {
  const response = await features.get(`/features/${id}`);

  dispatch({ type: FETCH_FEATURE, payload: response.data });
};

// For RESTFul APIs usually PUT replaces ALL the properties of a record.
// If we need to edit only SOME properties of a record, we should use
// PATCH instead of PUT. The implementations of PUT on your backend server
// might not be similar to this, but usually in convention it is so.
// By the way, the 'id' property is usually immune to this problem but not
// always.
export const editFeature = (id, formValues) => async dispatch => {
  // const response = await features.put(`/features/${id}`, formValues);
  // Instead of put, let's use patch:
  const response = await features.patch(`/features/${id}`, formValues);

  dispatch({ type: EDIT_FEATURE, payload: response.data });

  // Do some programmatic navigation to get the user to the root route.
  // We are forcibly routing the user to the root page.
  history.push('/');
};

// Delete icin Rest Api bize bir response donmuyor convention olarak.
export const deleteFeature = id => async dispatch => {
  await features.delete(`/features/${id}`);

  dispatch({ type: DELETE_FEATURE, payload: id });

  // Do some programmatic navigation to get the user to the root route.
  // We are forcibly routing the user to the root page.
  history.push('/');
};
