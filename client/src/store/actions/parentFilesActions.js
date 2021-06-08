import entities from '../../apis/entities';
import { headerWithToken } from '../../apis/apiUtil';
import { FETCH_ENTITY_PARENT_FILES, FETCH_VIEW_PARENT_FILES } from './types';

export const fetchEntityParentFiles = token => async dispatch => {
  const response = await entities.get('/entities/parentfiles', {
    headers: headerWithToken(token)
  });
  dispatch({ type: FETCH_ENTITY_PARENT_FILES, payload: response.data });
};

export const fetchViewParentFiles = token => async dispatch => {
  const response = await entities.get('/views/parentfiles', {
    headers: headerWithToken(token)
  });
  dispatch({ type: FETCH_VIEW_PARENT_FILES, payload: response.data });
};
