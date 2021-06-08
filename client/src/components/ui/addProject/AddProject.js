import React, { useCallback } from 'react';

import PickList from '../picklist/PickList';
import CheckboxList from '../checkboxList/CheckboxList';
import Input from '../input/Input';

const renderPickListIfOnCreateNewRecordMode = (
  sourceProjects,
  targetProjects,
  onSetSourceAndTargetProjects,
  onCreateProjectsOnNewRecordModeHandler,
  onAddProjectComponentChange
) => {
  if (
    (sourceProjects && sourceProjects.length > 0) ||
    (targetProjects && targetProjects.length > 0)
  ) {
    return (
      <div
        style={{
          backgroundColor: '#ffffff',
          borderBottomLeftRadius: '12px',
          WebkitBorderBottomRightRadius: '12px'
        }}
      >
        <PickList
          sourceArray={sourceProjects}
          targetArray={targetProjects}
          onChange={e =>
            onSetSourceAndTargetProjects(e.sourceArray, e.targetArray)
          }
          onCreateClicked={() => {
            onCreateProjectsOnNewRecordModeHandler();
            onAddProjectComponentChange();
          }}
        />
      </div>
    );
  }

  return null;
};

const renderAddNewProjectComboboxIfOnEditMode = (
  sourceProjects,
  onSetSelectedNewProject,
  onCreateProjectsOnEditMode,
  onAddProjectComponentChange
) => {
  if (sourceProjects.length > 0) {
    const options = sourceProjects.map(p => ({
      value: p,
      displayValue: p
    }));
    const elementConfig = { options };

    return (
      <div
        style={{
          backgroundColor: '#ffffff',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px'
        }}
      >
        <Input
          // key={}
          label={'Available New Projects'}
          elementType={'select'}
          elementConfig={elementConfig}
          invalid={false}
          // shouldValidate={}
          touched={false}
          // value={value}
          changed={event => onSetSelectedNewProject(event.target.value)}
        />

        <div
          style={{
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <button
            className='EntityForm-projects-add-new-button'
            onClick={() => {
              onCreateProjectsOnEditMode();
              onAddProjectComponentChange();
            }}
          >
            Add Selected Project
          </button>
        </div>
      </div>
    );
  }

  return null;
};

const renderProjectGroups = (
  projectGroups,
  projectGroupsOfItem,
  projectGroupClickedHandler
) => {
  if (!projectGroups || projectGroups.length === 0) {
    return null;
  }

  const projectGroupIdsOfItem = Object.keys(projectGroupsOfItem);

  const checkboxItemsArr = [];
  for (const pg of Object.values(projectGroups)) {
    checkboxItemsArr.push({
      itemId: pg.projectGroupId,
      itemName: pg.projectGroupName,
      isChecked: projectGroupIdsOfItem.includes(pg.projectGroupId)
    });
  }

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <CheckboxList
        itemsArr={checkboxItemsArr}
        onItemClicked={projectGroupClickedHandler}
      />
    </div>
  );
};

const addProject = React.memo(props => {
  const {
    mode,
    createMode,
    editMode,
    projectGroups,
    projectGroupsOfItem,
    sourceProjects,
    targetProjects,
    onChange,
    onAddProjectsOfAGivenGroupToSourceProjects,
    onSetSourceAndTargetProjects,
    onCreateProjectsOnNewRecordModeHandler,
    onSetSelectedNewProject,
    onCreateProjectsOnEditModeHandler
  } = props;

  const projectGroupClickedHandler = useCallback(
    (projectGroupId, isChecked) => {
      onAddProjectsOfAGivenGroupToSourceProjects(projectGroupId, isChecked);
    },
    [onAddProjectsOfAGivenGroupToSourceProjects]
  );

  let projectsComponent = <p>Loading...</p>;

  if (mode === createMode) {
    projectsComponent = renderPickListIfOnCreateNewRecordMode(
      sourceProjects,
      targetProjects,
      onSetSourceAndTargetProjects,
      onCreateProjectsOnNewRecordModeHandler,
      onChange
    );
  } else if (mode === editMode && sourceProjects?.length > 0) {
    projectsComponent = renderAddNewProjectComboboxIfOnEditMode(
      sourceProjects,
      onSetSelectedNewProject,
      onCreateProjectsOnEditModeHandler,
      onChange
    );
  }

  return (
    <>
      {renderProjectGroups(
        projectGroups,
        projectGroupsOfItem,
        projectGroupClickedHandler
      )}
      {projectsComponent}
    </>
  );
});

export default addProject;
