import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import PersonIcon from '@material-ui/icons/Person';

// import axiosEntities from '../../apis/entities';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { createEntityFiles } from '../../store/actions/createFileActions';
import { fetchEntities, deleteEntity } from '../../store/actions/entityActions';
import { fetchEntityParentFiles } from '../../store/actions/parentFilesActions';
import { fetchProjectGroups } from '../../store/actions/projectGroupActions';
// import entities from '../../apis/entities';
import DynamicRow from '../dynamicRow/DynamicRow';
import YesNoModal from '../ui/modal/yesNoModal/YesNoModal';

const EntityList = props => {
  const {
    token,
    fetchEntities,
    fetchParentFiles,
    fetchProjectGroups,
    deleteEntity
  } = props;

  // TODO: Bunlari useReducer ile birlestirmek lazim:
  const [renderDelete, setRenderDelete] = useState(false);
  const [itemIdToBeDeleted, setItemIdToBeDeleted] = useState();
  const [entityKeyToBeDeleted, setEntityKeyToBeDeleted] = useState();

  useEffect(() => {
    console.log('RENDERING [EntityList]');
  });

  useEffect(() => {
    fetchEntities(token);

    // Liste ekraninda bir kere Entity Parent Files listesini server'dan cekelim. Sonra onu EntityEdit vs gibi yerlerde kullanacagiz.
    fetchParentFiles(token);

    fetchProjectGroups(token);
  }, [token, fetchEntities, fetchProjectGroups, fetchParentFiles]);

  const onDeleteButtonClicked = useCallback((id, entityKeyToBeDeleted) => {
    setRenderDelete(true);
    setItemIdToBeDeleted(id);
    setEntityKeyToBeDeleted(entityKeyToBeDeleted);
  }, []);

  const okayClickedHandler = useCallback(() => {
    // TODO: Delete yaparken spinner felan yapmak lazim. Hata olusursa da onu handle etmek lazim... Belki tekrar fetchEntities cagirmaya gerek yok. Eger delete icin hata gelmezse, ui'dan o kaydin kaldirilmasi yeterli aslinda.
    deleteEntity(itemIdToBeDeleted, token);
    setRenderDelete(false);
    setItemIdToBeDeleted(null);

    fetchEntities(token);
  }, [token, itemIdToBeDeleted, deleteEntity, fetchEntities]);

  const cancelClickedHandler = useCallback(() => {
    setRenderDelete(false);
    setItemIdToBeDeleted(null);
    setEntityKeyToBeDeleted(null);
  }, []);

  const renderList = () => {
    return props.entities.map(entity => {
      return (
        <DynamicRow
          key={entity.id}
          id={entity.id}
          itemKey={entity.entityKey}
          itemUserId={entity.userId}
          signedInUserId={props.userId}
          enValue={entity.enValue}
          trValue={entity.trValue}
          routePath={'/entities'}
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
            to='/entities/new'
            className='ToolbarButton'
            style={{ backgroundColor: '#2185d0' }}
          >
            Create a New Record
          </Link>
        </div>
      );
    }
  };

  const createEntityFiles = () => {
    props.createEntityFiles(token);
  };

  // TODO: Burada button icin className="ToolbarButton" kullandik. Aslinda o Toolbar.css icinde ama global oldugu icin buraya da apply ediyor. Butun projede ortak olarak kullanilacak seyler icin bunlari daha ust seviyede bir css dosyasina yazmak lazim. App.css olabilir mesela. Ya da buton'lar icin direkt Buton component'ine tasinabilir bunlar.
  return (
    <div>
      <h2>Entities</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Link
          to='/entities/new'
          className='ToolbarButton'
          style={{ backgroundColor: '#2185d0' }}
        >
          Create a New Record
        </Link>
        <button
          className='ToolbarButton'
          style={{ backgroundColor: '#2185d0' }}
          onClick={createEntityFiles}
        >
          Generate Entity Files
        </button>
      </div>

      {renderList()}
      {/* {renderCreate()} */}

      {renderDelete && (
        <YesNoModal
          header={'Deletion Warning!'}
          onOkayClicked={okayClickedHandler}
          onCancelClicked={cancelClickedHandler}
        >
          {'The following item will be deleted. Are you sure?'}
          <br />
          <br />
          {entityKeyToBeDeleted}
        </YesNoModal>
      )}
    </div>
  );
};

// NOT: Redux state'de array yerine object {key: id, value: nesne} seklinde tutuyoruz.
// Fakat elimizdekileri component'da liste seklinde gosterirken, redux state'dan object
// seklinden array sekline donusturuyoruz. Array uzerinde map fonksiyonu cagirmak kolay
// cunku. Aslinda lodash kullanip, nesne uzerinde de map yapabilirdik fakat component
// kisminda artik cok fazla lodash'e dependent olmak istemiyoruz.
//
// Aslinda Rest API'den bize array geliyor. Biz onu reducer'da id'leri key olacak
// sekilde key-value nesnesine donusturuyoruz. Update yani Edit'ler kolay olsun diye.
// Daha sonra buradaki mapStateToProps kisminde tekrar array'e donusturuyoruz.
//
// Object.values is a built-in Javascript function. It's going to take an object as
// an argument. All the different values inside of that object are going to be pulled
// out and then inserted into an array.
const mapStateToProps = state => {
  const { userId, isSignedIn, token } = state.auth;
  return {
    userId,
    isSignedIn,
    token,
    entities: Object.values(state.entities)
  };
};

export default connect(mapStateToProps, {
  fetchEntities,
  fetchProjectGroups,
  fetchParentFiles: fetchEntityParentFiles,
  deleteEntity,
  createEntityFiles
})(EntityList);
// })(withErrorHandler(EntityList, axiosEntities));
// TODO withErrorHandler denedim ama calismadi. Sonradan ugrasmak lazim.
