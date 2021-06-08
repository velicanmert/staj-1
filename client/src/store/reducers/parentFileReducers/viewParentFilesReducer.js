import _ from 'lodash';
import { FETCH_VIEW_PARENT_FILES } from '../../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_VIEW_PARENT_FILES:
      return { ..._.mapKeys(action.payload, 'id') };
    default:
      return state;
  }
};
