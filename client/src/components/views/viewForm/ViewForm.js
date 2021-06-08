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
import * as viewFormFromFile from './viewForm.json';
// import PickList from '../../ui/picklist/PickList';
import AddProject from '../../ui/addProject/AddProject';
import ErrorModal from '../../ui/modal/errorModal/ErrorModal';
import { createMode, editMode } from '../../../common/modes';
import realProjectsReducer from '../../reducersForHooks/ProjectsReducer';

const importedViewForm = viewFormFromFile.default;

const getSourceProjects = (view, isEditMode, projectGroups) => {
  // // Create modda ise, sourceProjects butun projeler listesine set edilir.
  // // Edit modda ise, sourceProjects props ile gelen view'nin projeleri haricindeki proje listesine set edilir. Yani aslinda bu view'e ekleyebilecegi diger projeleri listeliyoruz.
  // const arr = Object.values(gpyProjects);
  // let _sourceProjects = arr ? arr.map(p => p.projectId) : [];

  // console.log('[getSourceProjects] view:', view);
  // console.log('[getSourceProjects] isEditMode:', isEditMode);
  // console.log('projectGroups: ', projectGroups);

  let _sourceProjects = null;
  if (isEditMode) {
    const projectGroupsOfViewArr = view.projectGroups.map(
      pg => pg.projectGroupId
    );

    _sourceProjects = Array.from(
      new Set(
        Object.values(projectGroups)
          .filter(pg => projectGroupsOfViewArr.includes(pg.projectGroupId))
          .flatMap(pg => pg.projectsInTheGroup)
      )
    );

    const extractedProjectsOfTheViewObj = {
      ..._.mapKeys(view.projects, 'projectId')
    };

    for (let key in extractedProjectsOfTheViewObj) {
      // View'de var olan projeleri sourceProjects'den eliyoruz:
      _sourceProjects = _sourceProjects.filter(
        p => p !== extractedProjectsOfTheViewObj[key].projectId
      );
    }
  }

  return _sourceProjects;
};

const projectsReducer = (currentProjectsState, action) => {
  return realProjectsReducer(currentProjectsState, action, getSourceProjects);
};

const ViewForm = props => {
  const {
    mode,
    view,
    parentFiles,
    projectGroups,
    gpyProjects,
    onSubmit
  } = props;
  // console.log('[ViewForm] props:', props);

  const [errorMessage, setErrorMessage] = useState();

  const [viewForm, setViewForm] = useState(() => {
    // Use for…of to iterate over the values in an iterable, like an array for example. Strings are also an iterable type, so you can use for…of on strings:
    // Use for…in to iterate over the properties of an object (the object keys):
    for (let key in view) {
      const formElement = importedViewForm[key];
      if (formElement) {
        formElement.value = view[key];
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
    let parentFileInitialValue = importedViewForm.parentFile.value; //Edit mode ise
    if (createMode === mode && parentFileOptions.length > 0) {
      parentFileInitialValue = parentFileOptions[0].value;
    }

    importedViewForm.parentFile.elementConfig.options = parentFileOptions;
    importedViewForm.parentFile.value = parentFileInitialValue;

    return importedViewForm;
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const [projectsState, dispatchProjects] = useReducer(
    projectsReducer,
    undefined,
    () => {
      const _projectGroupsOfTheViewObj = {
        ..._.mapKeys(view.projectGroups, 'projectGroupId')
      };

      const _projectsOfTheViewObj = {
        ..._.mapKeys(view.projects, 'projectId')
      };

      const _sourceProjects = getSourceProjects(
        view,
        editMode === mode,
        projectGroups
      );

      return {
        projectGroups,
        projectGroupsOfTheItem: _projectGroupsOfTheViewObj,
        projectsOfTheItem: _projectsOfTheViewObj,
        sourceProjects: _sourceProjects,
        targetProjects: [],
        selectedNewProject: null
      };
    }
  );

  useEffect(() => {
    // getSourceProjects sadece parent'tan (mesela ViewCreate) ilk bu component render olurken gpyProjects bos geldi, hemen sonrasinda actionCreator vs sureci ile server'dan okundu ve bu component'e props olarak bu sefer dolu geldi. O dolu geldigi seferde bu useEffect tekrar calisiyor. ComponentDidUpdate gibi oluyor aslinda burasi. Class-based yaparken ComponentDidUpdate seklinde yapmistim zaten.

    dispatchProjects({
      type: GPY_PROJECTS_OR_ITEM_PROJECTS_UPDATED,
      isEditMode: editMode === mode,
      gpyProjects,
      projectGroups,
      item: view
    });
  }, [gpyProjects, projectGroups, mode, view]);

  useEffect(() => {
    if (editMode === mode) {
      dispatchProjects({
        type: UPDATE_SELECTED_NEW_PROJECT_WHEN_SOURCE_PROJECTS_UPDATED
      });
    }
  }, [projectsState.sourceProjects, mode]);

  useEffect(() => {
    console.log('[ViewForm] useEffect - RENDERING ViewForm. ');
  });

  const inputChangedHandler = useCallback(
    (event, inputIdentifier) => {
      const updatedViewForm = { ...viewForm }; // Deep clone yapmaz!!!
      const updatedFormElement = { ...updatedViewForm[inputIdentifier] };

      updatedFormElement.value = event.target.value;
      updatedFormElement.touched = true;
      updatedFormElement.valid = checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
      updatedViewForm[inputIdentifier] = updatedFormElement;

      let formIsValid = true;
      for (let inputIdentifierKey in updatedViewForm) {
        formIsValid = updatedViewForm[inputIdentifierKey].valid && formIsValid;
      }

      setViewForm(updatedViewForm);
      setFormIsValid(formIsValid);
    },
    [viewForm]
  );

  const errorModalCloseHandler = useCallback(() => {
    setErrorMessage(null);
  }, []);

  const checkTotalValidityAndSetIfFormIsValid = useCallback(
    newProjectsOfTheViewObj => {
      // viewForm ayri validate ediliyor, projectsOfTheViewObj ayri validate ediliyor. O nedenle ikisini de checkTotalValidityEnTr fonksiyonuna veriyoruz.
      const validityMessage = checkTotalValidityEnTr(
        viewForm,
        newProjectsOfTheViewObj
      );
      if (validityMessage != null) {
        setFormIsValid(true);
      } else {
        setErrorMessage(validityMessage);
      }
    },
    [viewForm]
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
      viewForm,
      projectsState.projectsOfTheItem,
      true
    );

    if (validityMessage !== null) {
      setErrorMessage(validityMessage);
      return;
    }

    const formData = {};
    for (let formElementIdentifier in viewForm) {
      formData[formElementIdentifier] = viewForm[formElementIdentifier].value;
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
    for (let key in viewForm) {
      let field = viewForm[key];

      // TODO: eger viewForm.json dosyasini js dosyasina cevirip, return edilen seyi de function haline getirirsek, orada mode olarak input verip, bu islemi orada yapabiliriz belki...
      if ('viewKey' === key) {
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
        defaultEnValue={viewForm.enValue.value}
        defaultTrValue={viewForm.trValue.value}
        projectsObj={projectsState.projectsOfTheItem}
        onProjectValueChanged={projectValueChangedHandler}
        onProjectRemoved={projectRemovedHandler}
      />
    );
  }, [
    viewForm,
    projectsState,
    projectValueChangedHandler,
    projectRemovedHandler
  ]);

  return (
    <div>
      <div className={'EntityFormData'}>
        <div className={'AlignLeft'}>
          <Button
            btnType="Success"
            disabled={!formIsValid}
            clicked={submitHandler}
          >
            SAVE
          </Button>

          <Button btnType="Danger" clicked={onCancelClicked}>
            CANCEL
          </Button>
        </div>

        {renderForm()}
      </div>

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

      {accordionForProjects}

      {errorMessage && (
        <ErrorModal header="Error" onClose={errorModalCloseHandler}>
          {errorMessage}
        </ErrorModal>
      )}
    </div>
  );
};

export default withRouter(ViewForm);
