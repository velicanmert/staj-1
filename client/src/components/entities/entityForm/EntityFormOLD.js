// import React, { Component } from 'react';
// import _ from 'lodash';
// import { withRouter } from 'react-router-dom';

// import Input from '../../ui/input/Input';
// import Button from '../../ui/button/Button';
// import Spinner from '../../ui/spinner/Spinner';
// import AccordionForProjects from '../../ui/accordionForProjects/AccordionForProjects';
// import { checkValidity } from '../../../shared/utility';
// import { checkTotalValidity } from './validation,';
// import './EntityForm.css';
// import * as entityFormFromFile from './entityForm.json';
// // import PickList from '../../ui/picklist/PickList';
// import AddProject from '../../ui/addProject/AddProject';
// import { createMode, editMode } from './modes';

// class EntityForm extends Component {
//   constructor(props) {
//     super(props);

//     const entityForm = entityFormFromFile.default;
//     // Use for…of to iterate over the values in an iterable, like an array for example. Strings are also an iterable type, so you can use for…of on strings:
//     // Use for…in to iterate over the properties of an object (the object keys):
//     for (let key in this.props.entity) {
//       const formElement = entityForm[key];
//       if (formElement) {
//         formElement.value = this.props.entity[key];
//         formElement.valid = checkValidity(
//           formElement.value,
//           formElement.validation
//         );
//       }
//     }

//     this.setParentFileComboboxValues(entityForm);

//     const projectsObj = {
//       ..._.mapKeys(this.props.entity.projects, 'projectId')
//     };

//     const gpyProjectsArr = this.getProjectsArrFromProjectsObj();
//     let {
//       sourceProjects,
//       selectedNewProject
//     } = this.getSourceProjectsAndSelectedNewProject(
//       gpyProjectsArr,
//       projectsObj
//     );

//     this.state = {
//       entityForm,
//       formIsValid: false,
//       // loading: false // Bunu artik redux'tan aliyoruz
//       projectsOfTheEntityObj: projectsObj,
//       sourceProjects,
//       targetProjects: [],
//       selectedNewProject
//     };
//   }

//   componentDidUpdate(prevProps) {
//     // console.log('[EntityForm componentDidUpdate] props: ', this.props);

//     // Typical usage (don't forget to compare props):
//     if (this.props.parentFiles !== prevProps.parentFiles) {
//       console.log('[EntityForm componentDidUpdate] parentFiles changed.');
//       // Sayfa refresh ile direkt acilirsa!!!
//       const entityForm = { ...this.state.entityForm };

//       this.setParentFileComboboxValues(entityForm);
//       this.setState({ entityForm });
//     }

//     if (this.props.gpyProjects !== prevProps.gpyProjects) {
//       // Sayfa refresh ile direkt acilirsa!!!
//       console.log('[EntityForm componentDidUpdate] gpyProjects changed.');
//       const gpyProjectsArr = this.getProjectsArrFromProjectsObj();

//       if (createMode === this.props.mode) {
//         this.setState({
//           sourceProjects: gpyProjectsArr,
//           targetProjects: []
//         });
//       } else if (editMode === this.props.mode) {
//         let {
//           sourceProjects,
//           selectedNewProject
//         } = this.getSourceProjectsAndSelectedNewProject(
//           gpyProjectsArr,
//           this.state.projectsOfTheEntityObj
//         );
//         this.setState({ sourceProjects, selectedNewProject });
//       }
//     }
//   }

//   getSourceProjectsAndSelectedNewProject(
//     gpyProjectsArr,
//     projectsOfTheEntityObj
//   ) {
//     let sourceProjects = gpyProjectsArr;
//     for (let key in projectsOfTheEntityObj) {
//       // Entity'de var olan projeleri sourceProjects'den eliyoruz:
//       sourceProjects = sourceProjects.filter(
//         p => p !== projectsOfTheEntityObj[key].projectId
//       );
//     }

//     let selectedNewProject = null;
//     if (sourceProjects.length > 0) {
//       selectedNewProject = sourceProjects[0];
//     }
//     return { sourceProjects, selectedNewProject };
//   }

//   getProjectsArrFromProjectsObj() {
//     const arr = Object.values(this.props.gpyProjects);
//     const gpyProjectsArr = arr ? arr.map(p => p.projectId) : [];
//     return gpyProjectsArr;
//   }

//   setParentFileComboboxValues = entityForm => {
//     const options = this.getParentFileComboboxOptionsFromProps();
//     let parentFileInitialValue = entityForm.parentFile.value; //Edit mode ise
//     if (createMode === this.props.mode && options && options.length > 0) {
//       parentFileInitialValue = options[0].value;
//     }

//     entityForm.parentFile.elementConfig.options = options;
//     entityForm.parentFile.value = parentFileInitialValue;
//   };

//   getParentFileComboboxOptionsFromProps = () => {
//     const parentFileOptions = [];
//     if (Object.keys(this.props.parentFiles).length > 0) {
//       for (let key in this.props.parentFiles) {
//         const parentFile = this.props.parentFiles[key];
//         parentFileOptions.push({
//           value: parentFile.id,
//           displayValue: parentFile.fileName
//         });
//       }
//     }
//     return parentFileOptions;
//   };

//   inputChangedHandler = (event, inputIdentifier) => {
//     const updatedEntityForm = { ...this.state.entityForm }; // Deep clone yapmaz!!!
//     const updatedFormElement = { ...updatedEntityForm[inputIdentifier] };

//     updatedFormElement.value = event.target.value;
//     updatedFormElement.touched = true;
//     updatedFormElement.valid = checkValidity(
//       updatedFormElement.value,
//       updatedFormElement.validation
//     );
//     updatedEntityForm[inputIdentifier] = updatedFormElement;

//     let formIsValid = true;
//     for (let inputIdentifierKey in updatedEntityForm) {
//       formIsValid = updatedEntityForm[inputIdentifierKey].valid && formIsValid;
//     }

//     this.setState({ entityForm: updatedEntityForm, formIsValid });
//   };

//   checkTotalValidityAndSetIfFormIsValid = () => {
//     if (
//       checkTotalValidity(
//         this.state.entityForm,
//         this.state.projectsOfTheEntityObj,
//         false
//       )
//     ) {
//       this.setState({ formIsValid: true });
//     }
//   };

//   projectValueChangedHandler = updatedProjectsObj => {
//     this.setState({ projectsOfTheEntityObj: updatedProjectsObj });
//     this.checkTotalValidityAndSetIfFormIsValid();
//   };

//   submitHandler = event => {
//     // Request gondermesin diye form submit'in default'unu prevent ediyoruz. Gonderirse page reload olur.
//     event.preventDefault();
//     if (
//       !checkTotalValidity(
//         this.state.entityForm,
//         this.state.projectsOfTheEntityObj,
//         true
//       )
//     ) {
//       return;
//     }

//     // this.setState({ loading: true }); loading artik buradaki state'de handle etmiyoruz.
//     const formData = {};
//     for (let formElementIdentifier in this.state.entityForm) {
//       formData[formElementIdentifier] = this.state.entityForm[
//         formElementIdentifier
//       ].value;
//     }

//     formData.projects = Object.values(this.state.projectsOfTheEntityObj).map(
//       p => {
//         return _.omit(p, 'onEditMode');
//       }
//     );

//     console.log('[EditForm submitHandler] formData: ', formData);

//     this.props.onSubmit(formData);
//   };

//   onCancelClicked = () => {
//     // Normalde bu component'e history object'i props olarak gelmiyor. Biz ona ulasabilmek icin component'i export ederken withRouter ile wrap ediyoruz.
//     this.props.history.goBack();
//   };

//   projectRemovedHandler = (updatedProjectsObj, removedProjectId) => {
//     this.setState({
//       projectsOfTheEntityObj: updatedProjectsObj,
//       sourceProjects: [...this.state.sourceProjects, removedProjectId].sort()
//     });
//     this.checkTotalValidityAndSetIfFormIsValid();
//   };

//   createProjectsOnNewRecordModeHandler = () => {
//     // TODO Galiba burada 3 noktaya gerek yok
//     const projectsOfTheEntityObj = { ...this.state.projectsOfTheEntityObj };
//     if (this.state.targetProjects && this.state.targetProjects.length > 0) {
//       for (let projectId of this.state.targetProjects) {
//         projectsOfTheEntityObj[projectId] = {
//           projectId: projectId,
//           enValue: '',
//           trValue: ''
//         };
//       }
//     }
//     this.setState({ projectsOfTheEntityObj, targetProjects: [] });
//   };

//   createProjectsOnEditModeHandler = () => {
//     if (!this.state.selectedNewProject) {
//       return;
//     }

//     const projectsOfTheEntityObj = { ...this.state.projectsOfTheEntityObj };
//     projectsOfTheEntityObj[this.state.selectedNewProject] = {
//       projectId: this.state.selectedNewProject,
//       enValue: '',
//       trValue: ''
//     };

//     const sourceProjects = this.state.sourceProjects.filter(
//       p => p !== this.state.selectedNewProject
//     );

//     let selectedNewProject = null;
//     if (sourceProjects.length > 0) {
//       selectedNewProject = sourceProjects[0];
//     }

//     this.setState({
//       projectsOfTheEntityObj,
//       sourceProjects,
//       selectedNewProject
//     });
//   };

//   getFormElementsArray = () => {
//     const formElementsArray = [];

//     // Use for…of to iterate over the values in an iterable, like an array for example. Strings are also an iterable type, so you can use for…of on strings:
//     // Use for…in to iterate over the properties of an object (the object keys):
//     for (let key in this.state.entityForm) {
//       let field = this.state.entityForm[key];

//       // TODO: eger entityForm.json dosyasini js dosyasina cevirip, return edilen seyi de function haline getirirsek, orada mode olarak input verip, bu islemi orada yapabiliriz belki...
//       if ('entityKey' === key) {
//         if (createMode === this.props.mode) {
//           field.elementConfig.disabled = false;
//         } else {
//           field.elementConfig.disabled = true;
//         }
//       }

//       formElementsArray.push({
//         id: key,
//         config: field
//       });
//     }

//     return formElementsArray;
//   };

//   renderForm = () => {
//     const formElementsArray = this.getFormElementsArray();

//     let form = (
//       <form onSubmit={this.submitHandler}>
//         {formElementsArray.map(formEl => {
//           let label = null;
//           if (formEl.config && formEl.config.label) {
//             label = formEl.config.label;
//           }

//           return (
//             <Input
//               key={formEl.id}
//               label={label}
//               elementType={formEl.config.elementType}
//               elementConfig={formEl.config.elementConfig}
//               invalid={!formEl.config.valid}
//               shouldValidate={formEl.config.validation}
//               touched={formEl.config.touched}
//               value={formEl.config.value}
//               changed={event => this.inputChangedHandler(event, formEl.id)}
//             />
//           );
//         })}
//       </form>
//     );

//     if (this.props.loading) {
//       form = <Spinner />;
//     }

//     return form;
//   };

//   setSelectedNewProjectHandler = value => {
//     this.setState({ selectedNewProject: value });
//   };

//   setSourceAndTargetProjectsHandler = (
//     sourceProjectsValue,
//     targetProjectsValue
//   ) => {
//     this.setState({
//       sourceProjects: sourceProjectsValue,
//       targetProjects: targetProjectsValue
//     });
//   };

//   render() {
//     // console.log('[EntityForm render] props: ', this.props);

//     return (
//       <div>
//         <div className={'EntityFormData'}>
//           {this.renderForm()}

//           <Button
//             btnType="Success"
//             disabled={!this.state.formIsValid}
//             clicked={this.submitHandler}
//           >
//             SAVE
//           </Button>

//           <Button btnType="Danger" clicked={this.onCancelClicked}>
//             CANCEL
//           </Button>
//         </div>

//         <AddProject
//           mode={this.props.mode}
//           createMode={createMode}
//           editMode={editMode}
//           sourceProjects={this.state.sourceProjects}
//           targetProjects={this.state.targetProjects}
//           setSourceAndTargetProjects={this.setSourceAndTargetProjectsHandler}
//           createProjectsOnNewRecordModeHandler={
//             this.createProjectsOnNewRecordModeHandler
//           }
//           setSelectedNewProject={this.setSelectedNewProjectHandler}
//           createProjectsOnEditModeHandler={this.createProjectsOnEditModeHandler}
//         />

//         <AccordionForProjects
//           defaultEnValue={this.state.entityForm.enValue.value}
//           defaultTrValue={this.state.entityForm.trValue.value}
//           projectsObj={this.state.projectsOfTheEntityObj}
//           onProjectValueChanged={this.projectValueChangedHandler}
//           onProjectRemoved={this.projectRemovedHandler}
//         />
//       </div>
//     );
//   }
// }

// export default withRouter(EntityForm);
