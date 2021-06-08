import { headerWithToken } from '../../apis/apiUtil';
import createFiles from '../../apis/createFiles';
import {
  CREATE_ENTITY_FILES,
  CREATE_LOOKUP_FILES,
  CREATE_VIEW_FILES,
  CREATE_COMMON_FILES,
  CREATE_CONFIG_FILES,
  CREATE_ERROR_FILES
} from './types';

export const createEntityFiles = token => async dispatch => {
  await createFiles.get('/createEntityFiles', {
    headers: headerWithToken(token)
  });
  dispatch({ type: CREATE_ENTITY_FILES });
};

export const createViewFiles = token => async dispatch => {
  await createFiles.get('/createViewFiles', {
    headers: headerWithToken(token)
  });
  dispatch({ type: CREATE_VIEW_FILES });
};

export const createLookupFiles = token => async dispatch => {
  await createFiles.get('/createLookupFiles', {
    headers: headerWithToken(token)
  });
  dispatch({ type: CREATE_LOOKUP_FILES });
};

export const createCommonFiles = token => async dispatch => {
  await createFiles.get('/createCommonFiles', {
    headers: headerWithToken(token)
  });
  dispatch({ type: CREATE_COMMON_FILES });
};

export const createConfigFiles = token => async (dispatch, getState) => {
  await createFiles.get('/createConfigFiles', {
    headers: headerWithToken(token)
  });
  dispatch({ type: CREATE_CONFIG_FILES });
};

export const createErrorFiles = token => async dispatch => {
  await createFiles.get('/createErrorFiles', {
    headers: headerWithToken(token)
  });
  dispatch({ type: CREATE_ERROR_FILES });
};
