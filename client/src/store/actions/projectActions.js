import entities from '../../apis/entities';
import { headerWithToken } from '../../apis/apiUtil';
import { FETCH_PROJECTS } from './types';

export const fetchProjects = token => async dispatch => {
  const response = await entities.get('/projects', {
    headers: headerWithToken(token)
  });
  // console.log('[fetchProjects actionCreator]: ', response.data);
  dispatch({ type: FETCH_PROJECTS, payload: response.data });
};
