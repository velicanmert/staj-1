import {
    CREATE_ENTITY_FILES,
    CREATE_LOOKUP_FILES,
    CREATE_VIEW_FILES,
    CREATE_COMMON_FILES, 
    CREATE_CONFIG_FILES, 
    CREATE_ERROR_FILES
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_ENTITY_FILES:
      return state;
    case CREATE_LOOKUP_FILES:
      return state;
    case CREATE_VIEW_FILES:
      return state;
    case CREATE_COMMON_FILES:
      return state;
    case CREATE_CONFIG_FILES:
      return state;
    case CREATE_ERROR_FILES:
      return state; 
    default:
      return state;
  }
};
