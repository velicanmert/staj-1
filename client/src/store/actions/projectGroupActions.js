import entities from '../../apis/entities';
import { headerWithToken } from '../../apis/apiUtil';
import { FETCH_PROJECT_GROUPS } from './types';

export const fetchProjectGroups = token => async dispatch => {
  const response = await entities.get('/projectGroups', {
    headers: headerWithToken(token)
  });
  console.log('[fetchProjectGroups actionCreator]: ', response.data);
  dispatch({ type: FETCH_PROJECT_GROUPS, payload: response.data });
};
