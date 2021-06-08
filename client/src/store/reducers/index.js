import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import entityReducer from './entityReducer';
import entityParentFilesReducer from './parentFileReducers/entityParentFilesReducer';
import viewParentFilesReducer from './parentFileReducers/viewParentFilesReducer';
import featureReducer from './featureReducer';
import viewReducer from './viewReducer';
import projectGroupsReducer from './projectGroupsReducer';
import projectsReducer from './projectsReducer';

export default combineReducers({
  // 'formReducer' bize redux-form tarafindan otomatik veriliyor, biz yazmiyoruz.
  // Yani npm i redux-form yapinca, zaten bize geliyor:
  // Bu arada buradaki key mutlaka 'form' olmak zorundaymis:
  form: formReducer,
  auth: authReducer,
  projectGroups: projectGroupsReducer,
  projects: projectsReducer,
  entities: entityReducer,
  entityParentFiles: entityParentFilesReducer,
  viewParentFiles: viewParentFilesReducer,
  features: featureReducer,
  views: viewReducer
});
