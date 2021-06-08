import _ from 'lodash';
import { FETCH_PROJECT_GROUPS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROJECT_GROUPS:
      console.log('[FETCH_PROJECT_GROUPS] reducer. Payload: ', action.payload);
      return { ..._.mapKeys(action.payload, 'projectGroupId') };
    default:
      return state;
  }
};
