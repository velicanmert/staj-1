import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchProjectGroups } from '../../store/actions/projectGroupActions';
import { fetchProjects } from '../../store/actions/projectActions';
import { createEntity } from '../../store/actions/entityActions';
import { fetchEntityParentFiles } from '../../store/actions/parentFilesActions';
import EntityForm from './entityForm/EntityForm';
import { createMode } from '../../common/modes';
import * as entityForm from './entityForm/entityForm.json';

const importedEntityForm = entityForm.default;

const EntityCreate = props => {
  const [entityForm] = useState(importedEntityForm);

  const {
    token,
    userId,
    fetchProjectGroups,
    projectGroups,
    gpyProjects,
    parentFiles,
    fetchProjects,
    fetchParentFiles,
    createEntity
  } = props;

  useEffect(() => {
    console.log('RENDERING EntityCreate...');
  });

  useEffect(() => {
    if (!projectGroups || Object.keys(projectGroups).length === 0) {
      // Sayfa refresh ile direkt acilirsa, Redux State bos olacak:
      console.log('[EntityCreate useEffect] fetching projectGroups.');
      fetchProjectGroups(token);
    }

    if (!gpyProjects || Object.keys(gpyProjects).length === 0) {
      // Sayfa refresh ile direkt acilirsa, Redux State bos olacak:
      console.log('[EntityCreate useEffect] fetching projects.');
      fetchProjects(token);
    }

    // Kullanici sayfayi refresh ederek gelmis ise (EditList'den degil de), o zaman Redux State'de parentFiles bulunmuyor. Bu durumda server'dan cekmek gerekiyor.
    if (!parentFiles || Object.keys(parentFiles).length === 0) {
      console.log('[EntityCreate useEffect] fetching parentFiles.');
      fetchParentFiles(token);
    }

    // this.setState({ parentFiles: this.props.parentFiles });
  }, [
    token,
    projectGroups,
    gpyProjects,
    parentFiles,
    fetchProjectGroups,
    fetchProjects,
    fetchParentFiles
  ]);

  const onSubmit = formValues => {
    // Redux-form kullansaydik preventDefault metodunu cagirmamiza gerek olmayacakti. Redux-form bunu bizim icin yapiyor: event.preventDefault();

    createEntity(formValues, userId, token);
  };

  const getEmptyEntity = () => {
    const emptyEntity = {};
    for (let key in entityForm) {
      emptyEntity[key] = '';
    }
    return emptyEntity;
  };

  return (
    <div>
      <h3>Create an Entity</h3>
      <EntityForm
        mode={createMode}
        entity={getEmptyEntity()}
        projectGroups={projectGroups}
        gpyProjects={gpyProjects}
        parentFiles={parentFiles}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const { userId, token } = state.auth;
  return {
    userId: userId,
    token,
    projectGroups: state.projectGroups,
    gpyProjects: state.projects,
    parentFiles: state.entityParentFiles
  };
};

export default connect(mapStateToProps, {
  fetchProjectGroups,
  fetchProjects,
  createEntity,
  fetchParentFiles: fetchEntityParentFiles
})(EntityCreate);
