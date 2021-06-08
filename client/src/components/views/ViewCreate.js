import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchProjectGroups } from '../../store/actions/projectGroupActions';
import { fetchProjects } from '../../store/actions/projectActions';
import { createView } from '../../store/actions/viewActions';
import { fetchViewParentFiles } from '../../store/actions/parentFilesActions';
import ViewForm from './viewForm/ViewForm';
import { createMode } from '../../common/modes';
import * as viewForm from './viewForm/viewForm.json';

const importedViewForm = viewForm.default;

const ViewCreate = props => {
  const [viewForm] = useState(importedViewForm);

  const {
    token,
    userId,
    fetchProjectGroups,
    projectGroups,
    gpyProjects,
    parentFiles,
    fetchProjects,
    fetchParentFiles,
    createView
  } = props;

  useEffect(() => {
    console.log('RENDERING ViewCreate...');
  });

  useEffect(() => {
    if (!projectGroups || Object.keys(projectGroups).length === 0) {
      // Sayfa refresh ile direkt acilirsa, Redux State bos olacak:
      console.log('[ViewCreate useEffect] fetching projectGroups.');
      fetchProjectGroups(token);
    }

    if (!gpyProjects || Object.keys(gpyProjects).length === 0) {
      // Sayfa refresh ile direkt acilirsa, Redux State bos olacak:
      console.log('[ViewCreate useEffect] fetching projects.');
      fetchProjects(token);
    }

    // Kullanici sayfayi refresh ederek gelmis ise (EditList'den degil de), o zaman Redux State'de parentFiles bulunmuyor. Bu durumda server'dan cekmek gerekiyor.
    if (!parentFiles || Object.keys(parentFiles).length === 0) {
      console.log('[ViewCreate useEffect] fetching parentFiles.');
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

    createView(formValues, userId, token);
  };

  const getEmptyView = () => {
    const emptyView = {};
    for (let key in viewForm) {
      emptyView[key] = '';
    }
    return emptyView;
  };

  return (
    <div>
      <h3>Create an View</h3>
      <ViewForm
        mode={createMode}
        view={getEmptyView()}
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
    parentFiles: state.viewParentFiles
  };
};

export default connect(mapStateToProps, {
  fetchProjectGroups,
  fetchProjects,
  createView,
  fetchParentFiles: fetchViewParentFiles
})(ViewCreate);
