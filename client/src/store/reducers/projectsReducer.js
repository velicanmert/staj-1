import _ from 'lodash';
import { FETCH_PROJECTS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      // console.log('[FETCH_PROJECTS] reducer. Payload: ', action.payload);
      return { ..._.mapKeys(action.payload, 'projectId') };
    default:
      return state;
  }
};
