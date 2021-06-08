import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchProjectGroups } from '../../store/actions/projectGroupActions';
import { fetchProjects } from '../../store/actions/projectActions';
import { fetchView, editView } from '../../store/actions/viewActions';
import { fetchViewParentFiles } from '../../store/actions/parentFilesActions';
import ViewForm from './viewForm/ViewForm';
import { editMode } from '../../common/modes';

const ViewEdit = props => {
  const {
    token,
    match,
    fetchProjectGroups,
    projectGroups,
    gpyProjects,
    parentFiles,
    fetchView,
    fetchProjects,
    fetchParentFiles,
    editView,
    view
  } = props;

  useEffect(() => {
    console.log('RENDERING ViewEdit...');
  });

  useEffect(() => {
    // Eger refresh ile degil de, EditList sayfasindan geliyorsak, mapStateToProps kisminda view'i Redux State'den aliyoruz. Ama yine de ne olur olmaz diye (belki server'da degisiklik oldu o arada), burada tekrar fetch ediyoruz. Best Practice.
    fetchView(match.params.id, token);

    if (!projectGroups || Object.keys(projectGroups).length === 0) {
      // Sayfa refresh ile direkt acilirsa, Redux State bos olacak:
      console.log('[ViewEdit] fetching projectGroups.');
      fetchProjectGroups(token);
    }

    if (!gpyProjects || Object.keys(gpyProjects).length === 0) {
      // Sayfa refresh ile direkt acilirsa, Redux State bos olacak:
      console.log('[ViewEdit] fetching projects.');
      fetchProjects(token);
    }

    if (!parentFiles || Object.keys(parentFiles).length === 0) {
      // Sayfa refresh ile direkt acilirsa, Redux State bos olacak:
      console.log('[ViewEdit] fetching parent files.');
      fetchParentFiles(token);
    }
  }, [
    token,
    match,
    parentFiles,
    projectGroups,
    gpyProjects,
    fetchProjectGroups,
    fetchView,
    fetchProjects,
    fetchParentFiles
  ]);

  const onSubmit = formValues => {
    editView(match.params.id, formValues, token);
  };

  if (!view) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <h3>Edit an View</h3>
      <ViewForm
        mode={editMode}
        view={view}
        projectGroups={projectGroups}
        gpyProjects={gpyProjects}
        parentFiles={parentFiles}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.auth.token,
    projectGroups: state.projectGroups,
    gpyProjects: state.projects,
    view: state.views[ownProps.match.params.id],
    parentFiles: state.viewParentFiles
  };
};

export default connect(mapStateToProps, {
  fetchProjectGroups,
  fetchProjects,
  fetchView,
  editView,
  fetchParentFiles: fetchViewParentFiles
})(ViewEdit);
