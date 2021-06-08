import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createViewFiles } from '../../store/actions/createFileActions';
import { fetchViews, deleteView } from '../../store/actions/viewActions';
import { fetchViewParentFiles } from '../../store/actions/parentFilesActions';
import { fetchProjectGroups } from '../../store/actions/projectGroupActions';
import DynamicRow from '../dynamicRow/DynamicRow';
import YesNoModal from '../ui/modal/yesNoModal/YesNoModal';

const ViewList = props => {
  const {
    token,
    fetchViews,
    fetchParentFiles,
    fetchProjectGroups,
    deleteView
  } = props;

  // TODO: Bunlari useReducer ile birlestirmek lazim:
  const [renderDelete, setRenderDelete] = useState(false);
  const [itemIdToBeDeleted, setItemIdToBeDeleted] = useState();
  const [viewKeyToBeDeleted, setViewKeyToBeDeleted] = useState();

  useEffect(() => {
    console.log('RENDERING [ViewList]');
  });

  useEffect(() => {
    fetchViews(token);

    // Liste ekraninda bir kere View Parent Files listesini server'dan cekelim. Sonra onu ViewEdit vs gibi yerlerde kullanacagiz.
    fetchParentFiles(token);

    fetchProjectGroups(token);
  }, [token, fetchViews, fetchProjectGroups, fetchParentFiles]);

  const onDeleteButtonClicked = useCallback((id, viewKeyToBeDeleted) => {
    setRenderDelete(true);
    setItemIdToBeDeleted(id);
    setViewKeyToBeDeleted(viewKeyToBeDeleted);
  }, []);

  const okayClickedHandler = useCallback(() => {
    // TODO: Delete yaparken spinner felan yapmak lazim. Hata olusursa da onu handle etmek lazim... Belki tekrar fetchViews cagirmaya gerek yok. Eger delete icin hata gelmezse, ui'dan o kaydin kaldirilmasi yeterli aslinda.
    deleteView(itemIdToBeDeleted, token);
    setRenderDelete(false);
    setItemIdToBeDeleted(null);

    fetchViews(token);
  }, [token, itemIdToBeDeleted, deleteView, fetchViews]);

  const cancelClickedHandler = useCallback(() => {
    setRenderDelete(false);
    setItemIdToBeDeleted(null);
    setViewKeyToBeDeleted(null);
  }, []);

  const renderList = () => {
    return props.views.map(view => {
      return (
        <DynamicRow
          key={view.id}
          id={view.id}
          itemKey={view.viewKey}
          itemUserId={view.userId}
          signedInUserId={props.userId}
          enValue={view.enValue}
          trValue={view.trValue}
          routePath={'/views'}
          deleteButtonClickedHandler={onDeleteButtonClicked}
        />
      );
    });
  };

  const renderCreate = () => {
    if (props.isSignedIn) {
      return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            to="/views/new"
            className="ToolbarButton"
            style={{ backgroundColor: '#2185d0' }}
          >
            Create a New Record
          </Link>
        </div>
      );
    }
  };

  const createViewFiles = () => {
    props.createViewFiles(token);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h2>Views</h2>
        <button
          className="ToolbarButton"
          style={{ backgroundColor: '#2185d0' }}
          onClick={createViewFiles}
        >
          Create View Files
        </button>
      </div>

      {renderList()}
      {renderCreate()}

      {renderDelete && (
        <YesNoModal
          header={'Deletion Warning!'}
          onOkayClicked={okayClickedHandler}
          onCancelClicked={cancelClickedHandler}
        >
          {'The following item will be deleted. Are you sure?'}
          <br />
          <br />
          {viewKeyToBeDeleted}
        </YesNoModal>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  // console.log('[ViewList] state: ', state);
  const { userId, isSignedIn, token } = state.auth;
  return {
    userId,
    isSignedIn,
    token,
    views: Object.values(state.views)
  };
};

export default connect(mapStateToProps, {
  fetchViews,
  fetchProjectGroups,
  fetchParentFiles: fetchViewParentFiles,
  deleteView,
  createViewFiles
})(ViewList);
// })(withErrorHandler(ViewList, axiosViews));
// TODO withErrorHandler denedim ama calismadi. Sonradan ugrasmak lazim.
