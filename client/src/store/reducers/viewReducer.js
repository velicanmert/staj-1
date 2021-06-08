import _ from 'lodash';
import {
  CREATE_VIEW,
  DELETE_VIEW,
  EDIT_VIEW,
  FETCH_VIEW,
  FETCH_VIEWS
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_VIEWS:
      return { ..._.mapKeys(action.payload, 'id') };
    case CREATE_VIEW:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_VIEW:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_VIEW:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_VIEW:
      const id = action.payload;
      return _.omit(state, id);
    default:
      return state;
  }
};
