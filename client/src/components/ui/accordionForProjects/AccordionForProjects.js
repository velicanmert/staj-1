import React, { PureComponent } from 'react';
import _ from 'lodash';

import Input from '../input/Input';
import './AccordionForProjects.css';

class AccordionForProjects extends PureComponent {
  state = {
    isProjectOnEditModeObj: {} // ilk component yuklendiginde bos oluyor. Bunu ancak herhangi bir proje edit edildinde set ediyorum.
  };

  projectCompleteEditingHandler = projectId => {
    this.setState({
      isProjectOnEditModeObj: {
        ...this.state.isProjectOnEditModeObj,
        [projectId]: false
      }
    });
  };

  projectRemoveHandler = projectId => {
    let updatedProjects = { ...this.props.projectsObj };
    updatedProjects = _.omit(updatedProjects, projectId);
    this.props.onProjectRemoved(updatedProjects, projectId);
  };

  projectValueChangedHandler = (event, projectId, inputIdentifier) => {
    const updatedProjects = { ...this.props.projectsObj };
    updatedProjects[projectId][inputIdentifier] = event.target.value;
    this.props.onProjectValueChanged(updatedProjects);
  };

  projectItemClickedHandler = (event, projectId) => {
    // Once hepsini kapat
    this.closeAllAccordionItems();

    // Sonra bir tanesini ac
    this.setState(prevState => {
      return {
        isProjectOnEditModeObj: {
          ...prevState.isProjectOnEditModeObj,
          [projectId]: true
        }
      };
    });
  };

  closeAllAccordionItems = () => {
    // NOT: Burada this.state.isProjectOnEditModeObj kullanmiyorum cunku ilk component yuklendiginde o nesne henuz state'de set etmemis oluyorum. Ilk herhangi bir projeye click yapilinca onu set ediyorum.

    const isProjectOnEditModeObj = {};

    const keysArr = Object.keys(this.props.projectsObj);
    for (let key of keysArr) {
      isProjectOnEditModeObj[key] = false;
    }

    this.setState({ isProjectOnEditModeObj });
  };

  renderProjects = () => {
    const enValueStr = 'enValue';
    const trValueStr = 'trValue';

    // Object seklinden, array sekline donusturelim ki sonra map yapmak kolay olsun.
    const projectsArr = Object.values(this.props.projectsObj);

    const list = projectsArr.map(p => {
      const { projectId, enValue, trValue } = p;

      let enStyle = { paddingLeft: '10px' };
      if (enValue !== this.props.defaultEnValue) {
        enStyle = { ...enStyle, color: 'orange' };
      }

      let trStyle = { paddingLeft: '10px' };
      if (trValue !== this.props.defaultTrValue) {
        trStyle = { ...trStyle, color: 'orange' };
      }

      let projectWrapperStyle = null;
      if (
        !enValue ||
        enValue.length === 0 ||
        !trValue ||
        trValue.length === 0
      ) {
        projectWrapperStyle = {
          boxShadow: '1px 1px 4px red',
          backgroundColor: '#ffffff'
        };
      }

      if (this.state.isProjectOnEditModeObj[projectId]) {
        return (
          <li key={projectId} style={projectWrapperStyle}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start'
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{projectId}</div>

                <button
                  className='AccordionForProjects-complete-editing-button'
                  onClick={() => this.projectCompleteEditingHandler(projectId)}
                >
                  Complete Editing (Close)
                </button>
              </div>

              <button
                className='AccordionForProjects-remove-button'
                onClick={() => this.projectRemoveHandler(projectId)}
              >
                Remove Project (Delete)
              </button>
            </div>

            <Input
              key={projectId.concat(enValueStr)}
              label='English value'
              elementType='input'
              elementConfig={{ type: 'text' }}
              invalid={true}
              shouldValidate={{ required: true }}
              touched={false}
              value={p.enValue}
              changed={event =>
                this.projectValueChangedHandler(event, projectId, enValueStr)
              }
            />

            <Input
              key={projectId.concat(trValueStr)}
              label='Turkish value'
              elementType='input'
              elementConfig={{ type: 'text' }}
              invalid={true}
              shouldValidate={{ required: true }}
              touched={false}
              value={p.trValue}
              changed={event =>
                this.projectValueChangedHandler(event, projectId, trValueStr)
              }
            />
          </li>
        );
      } else {
        return (
          <li
            key={projectId}
            onClick={event => this.projectItemClickedHandler(event, projectId)}
            style={projectWrapperStyle}
          >
            <div style={{ fontWeight: 'bold' }}>{projectId}</div>
            <div style={enStyle}>{enValue}</div>
            <div style={trStyle}>{trValue}</div>
          </li>
        );
      }
    });

    return (
      list.length > 0 && (
        <section className='AccordionForProjects-list'>
          <h4>Projects</h4>
          <ul>{list}</ul>
        </section>
      )
    );
  };

  render() {
    return <>{this.renderProjects()}</>;
  }
}

export default AccordionForProjects;
