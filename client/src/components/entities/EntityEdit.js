import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchProjectGroups } from '../../store/actions/projectGroupActions';
import { fetchProjects } from '../../store/actions/projectActions';
import { fetchEntity, editEntity } from '../../store/actions/entityActions';
import { fetchEntityParentFiles } from '../../store/actions/parentFilesActions';
import EntityForm from './entityForm/EntityForm';
import { editMode } from '../../common/modes';

const EntityEdit = props => {
  const {
    token,
    match,
    fetchProjectGroups,
    projectGroups,
    gpyProjects,
    parentFiles,
    fetchEntity,
    fetchProjects,
    fetchParentFiles,
    editEntity,
    entity
  } = props;

  useEffect(() => {
    console.log('RENDERING EntityEdit...');
  });

  useEffect(() => {
    // Eger refresh ile degil de, EditList sayfasindan geliyorsak, mapStateToProps kisminda entity'i Redux State'den aliyoruz. Ama yine de ne olur olmaz diye (belki server'da degisiklik oldu o arada), burada tekrar fetch ediyoruz. Best Practice.
    fetchEntity(match.params.id, token);

    if (!projectGroups || Object.keys(projectGroups).length === 0) {
      // Sayfa refresh ile direkt acilirsa, Redux State bos olacak:
      console.log('[EntityEdit] fetching projectGroups.');
      fetchProjectGroups(token);
    }

    if (!gpyProjects || Object.keys(gpyProjects).length === 0) {
      // Sayfa refresh ile direkt acilirsa, Redux State bos olacak:
      console.log('[EntityEdit] fetching projects.');
      fetchProjects(token);
    }

    if (!parentFiles || Object.keys(parentFiles).length === 0) {
      // Sayfa refresh ile direkt acilirsa, Redux State bos olacak:
      console.log('[EntityEdit] fetching parent files.');
      fetchParentFiles(token);
    }
  }, [
    token,
    match,
    parentFiles,
    projectGroups,
    gpyProjects,
    fetchProjectGroups,
    fetchEntity,
    fetchProjects,
    fetchParentFiles
  ]);

  const onSubmit = formValues => {
    editEntity(match.params.id, formValues, token);
  };

  if (!entity) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <h3>Edit an Entity</h3>
      <EntityForm
        mode={editMode}
        entity={entity}
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
    entity: state.entities[ownProps.match.params.id],
    parentFiles: state.entityParentFiles
  };
};

export default connect(mapStateToProps, {
  fetchProjectGroups,
  fetchProjects,
  fetchEntity,
  editEntity,
  fetchParentFiles: fetchEntityParentFiles
})(EntityEdit);
