import React, {
  useReducer,
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import {
  GPY_PROJECTS_OR_ITEM_PROJECTS_UPDATED,
  UPDATE_SELECTED_NEW_PROJECT_WHEN_SOURCE_PROJECTS_UPDATED,
  A_PROJECT_REMOVED_FROM_ITEM,
  SET_PROJECTS_OF_THE_ITEM,
  ADD_PROJECTS_OF_A_GIVEN_PROJECTGROUP_TO_SOURCE_PROJECTS,
  SET_SOURCE_AND_TARGET_PROJECTS,
  SET_SELECTED_NEW_PROJECT,
  ADD_NEW_PROJECTS_WHEN_ON_CREATE_MODE,
  ADD_NEW_PROJECT_WHEN_ON_EDIT_MODE
} from '../../reducersForHooks/reducerTypes';

import Input from '../../ui/input/Input';
import Button from '../../ui/button/Button';
import Spinner from '../../ui/spinner/Spinner';
import AccordionForProjects from '../../ui/accordionForProjects/AccordionForProjects';
import { checkValidity } from '../../../shared/utility';
import { checkTotalValidityEnTr } from '../../../common/validationEnTr';
import '../../../common/EntityForm.css';
import * as entityFormFromFile from './entityForm.json';
// import PickList from '../../ui/picklist/PickList';
import AddProject from '../../ui/addProject/AddProject';
import ErrorModal from '../../ui/modal/errorModal/ErrorModal';
import { createMode, editMode } from '../../../common/modes';
import realProjectsReducer from '../../reducersForHooks/ProjectsReducer';

const importedEntityForm = entityFormFromFile.default;

const getSourceProjects = (entity, isEditMode, projectGroups) => {
  // // Create modda ise, sourceProjects butun projeler listesine set edilir.
  // // Edit modda ise, sourceProjects props ile gelen entity'nin projeleri haricindeki proje listesine set edilir. Yani aslinda bu entity'e ekleyebilecegi diger projeleri listeliyoruz.
  // const arr = Object.values(gpyProjects);
  // let _sourceProjects = arr ? arr.map(p => p.projectId) : [];

  let _sourceProjects = null;
  if (isEditMode) {
    const projectGroupsOfEntityArr = entity.projectGroups.map(
      pg => pg.projectGroupId
    );

    _sourceProjects = Array.from(
      new Set(
        Object.values(projectGroups)
          .filter(pg => projectGroupsOfEntityArr.includes(pg.projectGroupId))
          .flatMap(pg => pg.projectsInTheGroup)
      )
    );

    const extractedProjectsOfTheEntityObj = {
      ..._.mapKeys(entity.projects, 'projectId')
    };

    for (let key in extractedProjectsOfTheEntityObj) {
      // Entity'de var olan projeleri sourceProjects'den eliyoruz:
      _sourceProjects = _sourceProjects.filter(
        p => p !== extractedProjectsOfTheEntityObj[key].projectId
      );
    }
  }

  return _sourceProjects;
};

const projectsReducer = (currentProjectsState, action) => {
  return realProjectsReducer(currentProjectsState, action, getSourceProjects);
};

const EntityForm = props => {
  const {
    mode,
    entity,
    parentFiles,
    projectGroups,
    gpyProjects,
    onSubmit
  } = props;

  const [errorMessage, setErrorMessage] = useState();

  const [entityForm, setEntityForm] = useState(() => {
    // Use for…of to iterate over the values in an iterable, like an array for example. Strings are also an iterable type, so you can use for…of on strings:
    // Use for…in to iterate over the properties of an object (the object keys):
    for (let key in entity) {
      const formElement = importedEntityForm[key];
      if (formElement) {
        formElement.value = entity[key];
        formElement.valid = checkValidity(
          formElement.value,
          formElement.validation
        );
      }
    }

    // getParentFileComboboxOptionsFromProps:
    const parentFileOptions = [];
    if (Object.keys(parentFiles).length > 0) {
      for (let key in parentFiles) {
        const parentFile = parentFiles[key];
        parentFileOptions.push({
          value: parentFile.id,
          displayValue: parentFile.fileName
        });
      }
    }

    // setParentFileComboboxValues:
    let parentFileInitialValue = importedEntityForm.parentFile.value; //Edit mode ise
    if (createMode === mode && parentFileOptions.length > 0) {
      parentFileInitialValue = parentFileOptions[0].value;
    }

    importedEntityForm.parentFile.elementConfig.options = parentFileOptions;
    importedEntityForm.parentFile.value = parentFileInitialValue;

    return importedEntityForm;
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const [projectsState, dispatchProjects] = useReducer(
    projectsReducer,
    undefined,
    () => {
      const _projectGroupsOfTheEntityObj = {
        ..._.mapKeys(entity.projectGroups, 'projectGroupId')
      };

      const _projectsOfTheEntityObj = {
        ..._.mapKeys(entity.projects, 'projectId')
      };

      const _sourceProjects = getSourceProjects(
        entity,
        editMode === mode,
        projectGroups
      );

      return {
        projectGroups,
        projectGroupsOfTheItem: _projectGroupsOfTheEntityObj,
        projectsOfTheItem: _projectsOfTheEntityObj,
        sourceProjects: _sourceProjects,
        targetProjects: [],
        selectedNewProject: null
      };
    }
  );

  useEffect(() => {
    // getSourceProjects sadece parent'tan (mesela EntityCreate) ilk bu component render olurken gpyProjects bos geldi, hemen sonrasinda actionCreator vs sureci ile server'dan okundu ve bu component'e props olarak bu sefer dolu geldi. O dolu geldigi seferde bu useEffect tekrar calisiyor. ComponentDidUpdate gibi oluyor aslinda burasi. Class-based yaparken ComponentDidUpdate seklinde yapmistim zaten.

    dispatchProjects({
      type: GPY_PROJECTS_OR_ITEM_PROJECTS_UPDATED,
      isEditMode: editMode === mode,
      gpyProjects,
      projectGroups,
      item: entity
    });
  }, [gpyProjects, projectGroups, mode, entity]);

  useEffect(() => {
    if (editMode === mode) {
      dispatchProjects({
        type: UPDATE_SELECTED_NEW_PROJECT_WHEN_SOURCE_PROJECTS_UPDATED
      });
    }
  }, [projectsState.sourceProjects, mode]);

  useEffect(() => {
    console.log(
      '[EntityForm] useEffect - RENDERING EntityForm. projectsState: ',
      projectsState
    );
  });

  const inputChangedHandler = useCallback(
    (event, inputIdentifier) => {
      const updatedEntityForm = { ...entityForm }; // Deep clone yapmaz!!!
      const updatedFormElement = { ...updatedEntityForm[inputIdentifier] };

      updatedFormElement.value = event.target.value;
      updatedFormElement.touched = true;
      updatedFormElement.valid = checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
      updatedEntityForm[inputIdentifier] = updatedFormElement;

      let formIsValid = true;
      for (let inputIdentifierKey in updatedEntityForm) {
        formIsValid =
          updatedEntityForm[inputIdentifierKey].valid && formIsValid;
      }

      setEntityForm(updatedEntityForm);
      setFormIsValid(formIsValid);
    },
    [entityForm]
  );

  const errorModalCloseHandler = useCallback(() => {
    setErrorMessage(null);
  }, []);

  const checkTotalValidityAndSetIfFormIsValid = useCallback(
    newProjectsOfTheEntityObj => {
      // entityForm ayri validate ediliyor, projectsOfTheEntityObj ayri validate ediliyor. O nedenle ikisini de checkTotalValidityEnTr fonksiyonuna veriyoruz.
      const validityMessage = checkTotalValidityEnTr(
        entityForm,
        newProjectsOfTheEntityObj
      );
      if (validityMessage != null) {
        setFormIsValid(true);
      } else {
        setErrorMessage(validityMessage);
      }
    },
    [entityForm]
  );

  const projectValueChangedHandler = useCallback(
    updatedProjectsObj => {
      dispatchProjects({
        type: SET_PROJECTS_OF_THE_ITEM,
        updatedProjectsObj
      });

      checkTotalValidityAndSetIfFormIsValid(updatedProjectsObj);
    },
    [checkTotalValidityAndSetIfFormIsValid]
  );

  const projectRemovedHandler = useCallback(
    (updatedProjectsObj, removedProjectId) => {
      dispatchProjects({
        type: A_PROJECT_REMOVED_FROM_ITEM,
        updatedProjectsObj,
        removedProjectId
      });

      checkTotalValidityAndSetIfFormIsValid(updatedProjectsObj);
    },
    [checkTotalValidityAndSetIfFormIsValid]
  );

  const submitHandler = event => {
    // Request gondermesin diye form submit'in default'unu prevent ediyoruz. Gonderirse page reload olur.
    event.preventDefault();

    const validityMessage = checkTotalValidityEnTr(
      entityForm,
      projectsState.projectsOfTheItem,
      true
    );

    if (validityMessage !== null) {
      setErrorMessage(validityMessage);
      return;
    }

    const formData = {};
    for (let formElementIdentifier in entityForm) {
      formData[formElementIdentifier] = entityForm[formElementIdentifier].value;
    }

    formData.projects = Object.values(projectsState.projectsOfTheItem).map(
      p => {
        return _.omit(p, 'onEditMode');
      }
    );

    formData.projectGroups = Object.values(
      projectsState.projectGroupsOfTheItem
    );

    onSubmit(formData);
  };

  const onCancelClicked = () => {
    // Normalde bu component'e history object'i props olarak gelmiyor. Biz ona ulasabilmek icin component'i export ederken withRouter ile wrap ediyoruz.
    props.history.goBack();
  };

  const createProjectsOnNewRecordModeHandler = useCallback(() => {
    dispatchProjects({ type: ADD_NEW_PROJECTS_WHEN_ON_CREATE_MODE });
  }, []);

  const createProjectsOnEditModeHandler = useCallback(() => {
    dispatchProjects({ type: ADD_NEW_PROJECT_WHEN_ON_EDIT_MODE });
  }, []);

  const getFormElementsArray = () => {
    const formElementsArray = [];

    // Use for…of to iterate over the values in an iterable, like an array for example. Strings are also an iterable type, so you can use for…of on strings:
    // Use for…in to iterate over the properties of an object (the object keys):
    for (let key in entityForm) {
      let field = entityForm[key];

      // TODO: eger entityForm.json dosyasini js dosyasina cevirip, return edilen seyi de function haline getirirsek, orada mode olarak input verip, bu islemi orada yapabiliriz belki...
      if ('entityKey' === key) {
        if (createMode === mode) {
          field.elementConfig.disabled = false;
        } else {
          field.elementConfig.disabled = true;
        }
      }

      formElementsArray.push({
        id: key,
        config: field
      });
    }

    return formElementsArray;
  };

  const renderForm = () => {
    if (props.loading) {
      return <Spinner />;
    }

    const formElementsArray = getFormElementsArray();
    return (
      <form onSubmit={submitHandler}>
        {formElementsArray.map(formEl => {
          const { id, config } = formEl;

          let label = null;
          if (config && config.label) {
            label = config.label;
          }

          return (
            <Input
              key={id}
              label={label}
              elementType={config.elementType}
              elementConfig={config.elementConfig}
              invalid={!config.valid}
              shouldValidate={config.validation}
              touched={config.touched}
              value={config.value}
              changed={event => inputChangedHandler(event, id)}
            />
          );
        })}
      </form>
    );
  };

  const addProjectsOfAGivenGroupToSourceProjectsHandler = useCallback(
    (projectGroupId, isChecked) => {
      dispatchProjects({
        type: ADD_PROJECTS_OF_A_GIVEN_PROJECTGROUP_TO_SOURCE_PROJECTS,
        projectGroupId,
        isChecked
      });
    },
    []
  );

  const setSourceAndTargetProjectsHandler = useCallback(
    (sourceProjectsValue, targetProjectsValue) => {
      // setSourceProjects(sourceProjectsValue);
      // setTargetProjects(targetProjectsValue);
      dispatchProjects({
        type: SET_SOURCE_AND_TARGET_PROJECTS,
        sourceProjectsValue,
        targetProjectsValue
      });
    },
    []
  );

  const setSelectedNewProjectHandler = useCallback(value => {
    dispatchProjects({
      type: SET_SELECTED_NEW_PROJECT,
      selectedNewProjectValue: value
    });
  }, []);

  // Sub-component'lerin gereksiz yere re-render olmasini engellemek icin birinci yontem o component'in tanimlandigi yerde React.memo() kullanmak. Ikinci yontem de burada oldugu gibi parent component'de useMemo hook kullanmak. AddProject icin React.memo yaptim ama useMemo ornegi kodda olsun diye de burada AccordionForProjects icin useMemo kullandim.
  // Her iki yontem icin de props olarak verdigimiz fonksiyonlari useCallback icine almamiz gerekiyor gereksiz re-render engellemek icin.
  // Subcomponent'ler icin useMemo degil de, React.memo() kullanmak tavsiye ediliyor, daha clear oldugu ve kodun daha rahat okunabilmesi icin. Ne zaman useMemo kullanmak lazim? Ornegin bir component yuklenirken, bir component degil de, bir value icin cok intensive bir hesaplama-calculation yapiyorsun. Her re-render icin bu calculation yapilmasin, sadece gerektigi zaman recalculation yapilsin dedigimiz durumlrda useMemo kullanmak lazim. Yani subcomponent'leri memorize etmekten ziyade, value'lari memorize etmek icin.
  const accordionForProjects = useMemo(() => {
    return (
      <AccordionForProjects
        defaultEnValue={entityForm.enValue.value}
        defaultTrValue={entityForm.trValue.value}
        projectsObj={projectsState.projectsOfTheItem}
        onProjectValueChanged={projectValueChangedHandler}
        onProjectRemoved={projectRemovedHandler}
      />
    );
  }, [
    entityForm,
    projectsState,
    projectValueChangedHandler,
    projectRemovedHandler
  ]);

  return (
    <div>
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '0 15px',
          borderRadius: '12px'
        }}
      >
        <div style={{ marginBottom: '10px' }}>
          <div className={'EntityFormData'}>{renderForm()}</div>

          <AddProject
            mode={mode}
            createMode={createMode}
            editMode={editMode}
            projectGroups={projectGroups}
            projectGroupsOfItem={projectsState.projectGroupsOfTheItem}
            sourceProjects={projectsState.sourceProjects}
            targetProjects={projectsState.targetProjects}
            onChange={() => setFormIsValid(true)}
            onAddProjectsOfAGivenGroupToSourceProjects={
              addProjectsOfAGivenGroupToSourceProjectsHandler
            }
            onSetSourceAndTargetProjects={setSourceAndTargetProjectsHandler}
            onCreateProjectsOnNewRecordModeHandler={
              createProjectsOnNewRecordModeHandler
            }
            onSetSelectedNewProject={setSelectedNewProjectHandler}
            onCreateProjectsOnEditModeHandler={createProjectsOnEditModeHandler}
          />
        </div>

        {accordionForProjects}
      </div>
      <div className='AlignRight'>
        <button
          className='ToolbarButton'
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #424242',
            color: '#424242'
          }}
          onClick={onCancelClicked}
        >
          Cancel
        </button>
        <button
          className='ToolbarButton'
          style={{ backgroundColor: '#2185d0' }}
          onClick={submitHandler}
        >
          Save
        </button>
      </div>

      {errorMessage && (
        <ErrorModal header='Error' onClose={errorModalCloseHandler}>
          {errorMessage}
        </ErrorModal>
      )}
    </div>
  );
};

export default withRouter(EntityForm);
