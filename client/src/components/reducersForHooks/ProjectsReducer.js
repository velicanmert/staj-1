import _ from 'lodash';
import {
  A_PROJECT_REMOVED_FROM_ITEM,
  ADD_NEW_PROJECTS_WHEN_ON_CREATE_MODE,
  ADD_NEW_PROJECT_WHEN_ON_EDIT_MODE,
  ADD_PROJECTS_OF_A_GIVEN_PROJECTGROUP_TO_SOURCE_PROJECTS,
  GPY_PROJECTS_OR_ITEM_PROJECTS_UPDATED,
  SET_PROJECTS_OF_THE_ITEM,
  SET_SOURCE_AND_TARGET_PROJECTS,
  SET_SELECTED_NEW_PROJECT,
  UPDATE_SELECTED_NEW_PROJECT_WHEN_SOURCE_PROJECTS_UPDATED
} from './reducerTypes';

// Source projects degeri hem create hem de edit modda iken anlamli. Create modda ise pick-list icin soldaki secenekleri set etmek icin kullaniliyor. Edit modda ise eklenebilecek projeler combobox'indaki secenekleri set etmek icin kullaniliyor.
// Target projects degeri create modda iken anlamli. Ilk render ederken target bos olmali.
// selectedNewProject degeri edit modda iken anlamli. Bunu hep sourceProjects arrayinin ilk elemanina set ediyoruz.
const projectsReducer = (currentProjectsState, action, getSourceProjects) => {
  switch (action.type) {
    case GPY_PROJECTS_OR_ITEM_PROJECTS_UPDATED:
      return {
        ...currentProjectsState,
        sourceProjects: getSourceProjects(
          action.item,
          action.isEditMode,
          action.projectGroups
        )
      };

    case UPDATE_SELECTED_NEW_PROJECT_WHEN_SOURCE_PROJECTS_UPDATED:
      let _selectedNewProject = null;
      if (currentProjectsState.sourceProjects.length > 0) {
        _selectedNewProject = currentProjectsState.sourceProjects[0];
      }
      return {
        ...currentProjectsState,
        selectedNewProject: _selectedNewProject
      };

    case A_PROJECT_REMOVED_FROM_ITEM:
      return {
        ...currentProjectsState,
        projectsOfTheItem: action.updatedProjectsObj,
        sourceProjects: [
          ...currentProjectsState.sourceProjects,
          action.removedProjectId
        ].sort()
      };

    case SET_PROJECTS_OF_THE_ITEM:
      return {
        ...currentProjectsState,
        projectsOfTheItem: action.updatedProjectsObj
      };

    case ADD_PROJECTS_OF_A_GIVEN_PROJECTGROUP_TO_SOURCE_PROJECTS:
      if (!currentProjectsState.projectGroups[action.projectGroupId]) {
        return currentProjectsState;
      }

      const currentProjectsArrInStr = Object.keys(
        currentProjectsState.projectsOfTheItem
      );

      let updatedrojectsOfTheItem = {
        ...currentProjectsState.projectsOfTheItem
      };

      let updatedProjectGroupsOfTheItem = null;
      let updatedSourceProjects = null;
      if (action.isChecked) {
        const temp = currentProjectsState.sourceProjects
          ? [...currentProjectsState.sourceProjects]
          : [];

        // Burada duplicate'lari elemek icin Set olusturuyoruz sonra onu tekrar Array'e ceviriyoruz. Ayrica bu entity'de daha onceden zaten eklenmis olan bir proje varsa, onu sourceProjects kismina koymuyoruz. Ayrica daha onceden targetProjects kismina da eklenmis projeler olabilir, eger varsa onu da sourceProjects kismina koymuyoruz.
        updatedSourceProjects = Array.from(
          new Set([
            // ...currentProjectsState.sourceProjects,
            ...temp,
            ...currentProjectsState.projectGroups[action.projectGroupId]
              ?.projectsInTheGroup
          ])
        )
          .filter(p => !currentProjectsArrInStr.includes(p))
          .filter(p => !currentProjectsState.targetProjects.includes(p))
          .sort();

        updatedProjectGroupsOfTheItem = {
          ...currentProjectsState.projectGroupsOfTheItem,
          [action.projectGroupId]: { projectGroupId: action.projectGroupId }
        };
      } else {
        updatedProjectGroupsOfTheItem = _.omit(
          currentProjectsState.projectGroupsOfTheItem,
          action.projectGroupId
        );

        const projectsArr = [];
        for (const key of Object.keys(updatedProjectGroupsOfTheItem)) {
          currentProjectsState.projectGroups[key].projectsInTheGroup.forEach(
            p => {
              projectsArr.push(p);
            }
          );
        }

        updatedSourceProjects = Array.from(new Set(projectsArr))
          .filter(p => !currentProjectsArrInStr.includes(p))
          .sort();

        for (const key of Object.keys(currentProjectsState.projectsOfTheItem)) {
          if (!projectsArr.includes(key)) {
            updatedrojectsOfTheItem = _.omit(updatedrojectsOfTheItem, key);
          }
        }
      }

      const theUpdatedSelectedNewProject =
        updatedSourceProjects.length > 0 ? updatedSourceProjects[0] : null;

      return {
        ...currentProjectsState,
        sourceProjects: updatedSourceProjects,
        selectedNewProject: theUpdatedSelectedNewProject,
        projectGroupsOfTheItem: updatedProjectGroupsOfTheItem,
        projectsOfTheItem: updatedrojectsOfTheItem
      };

    case SET_SOURCE_AND_TARGET_PROJECTS:
      return {
        ...currentProjectsState,
        sourceProjects: action.sourceProjectsValue,
        targetProjects: action.targetProjectsValue
      };

    case SET_SELECTED_NEW_PROJECT:
      return {
        ...currentProjectsState,
        selectedNewProject: action.selectedNewProjectValue
      };

    case ADD_NEW_PROJECTS_WHEN_ON_CREATE_MODE:
      // Burada 3 nokta mutlaka gerekli!!! Diger turlu, return ederken object degismemis gibi, yani state'i bu dilimi degismemis gibi algilaniyor.
      const _projectsOfTheItem = {
        ...currentProjectsState.projectsOfTheItem
      };
      const _targetProjects = currentProjectsState.targetProjects;
      if (_targetProjects.length > 0) {
        for (const projectId of _targetProjects) {
          _projectsOfTheItem[projectId] = {
            projectId,
            enValue: '',
            trValue: ''
          };
        }
      }

      return {
        ...currentProjectsState,
        projectsOfTheItem: _projectsOfTheItem,
        targetProjects: []
      };

    case ADD_NEW_PROJECT_WHEN_ON_EDIT_MODE:
      console.log('ADD_NEW_PROJECT_WHEN_ON_EDIT_MODE1', currentProjectsState);
      if (!currentProjectsState.selectedNewProject) {
        return;
      }

      // Burada 3 nokta mutlaka gerekli!!! Diger turlu, return ederken object degismemis gibi, yani state'i bu dilimi degismemis gibi algilaniyor.
      const _currojectsOfTheItem = {
        ...currentProjectsState.projectsOfTheItem
      };
      _currojectsOfTheItem[currentProjectsState.selectedNewProject] = {
        projectId: currentProjectsState.selectedNewProject,
        enValue: '',
        trValue: ''
      };

      const _sourceProjects = currentProjectsState.sourceProjects.filter(
        p => p !== currentProjectsState.selectedNewProject
      );

      const _updatedSelectedNewProject =
        _sourceProjects.length > 0 ? _sourceProjects[0] : null;

      return {
        ...currentProjectsState,
        projectsOfTheItem: _currojectsOfTheItem,
        sourceProjects: _sourceProjects,
        selectedNewProject: _updatedSelectedNewProject
      };

    default:
      throw new Error('Should not get here!');
  }
};

export default projectsReducer;
