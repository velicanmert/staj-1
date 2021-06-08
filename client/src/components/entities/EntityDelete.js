import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchEntity, deleteEntity } from '../../store/actions/entityActions';
import history from '../../history';
import Modal from '../Modal';

const EntityDelete = props => {
  const { token, match, entity, fetchEntity, deleteEntity } = props;

  useEffect(() => {
    fetchEntity(match.params.id, token);

    // setTimeout denemesi: Asagidaki renderContent metodunda ekranda ilk load
    // ederken ve sonrasinda farkli mesajlar gosterildigini gormek icin test:
    //setTimeout(() => fetchEntity(match.params.id), 3000);
  }, [token, match, fetchEntity]);

  const renderActions = () => {
    const actions = (
      <>
        <button
          onClick={() => deleteEntity(match.params.id, token)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );

    return actions;
  };

  const renderContent = () => {
    const message = 'Are you sure you want to delete ';
    if (!entity) {
      return `${message} this entity?`;
    }

    return (
      <div>
        {`${message} the entity with the following key?`}
        <p>{`${entity.entityKey}`}</p>
      </div>
    );
  };

  // Component ilk render edildiginde henuz daha componentDidMount cagrilmadigi
  // icin, bizim entity nesnesi load edilmemis oluyor. O nedenle burada null check
  // gibi birseyler yapmamiz gerekiyor.
  // EntityEdit component'da bunu Loading... gostererek asagidaki sekilde yapmistik
  // ama EntityDelete icin burada renderContent metodu ile yapacagiz.
  // if (!this.props.entity) {
  //   return <div>Loading....</div>;
  // }

  return (
    <div className="deneme">
      <Modal
        title="Delete Entity"
        content={renderContent()}
        actions={renderActions()} // We need to call the function
        onDismiss={() => history.push('/')}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.auth.token,
    entity: state.entities[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchEntity, deleteEntity })(
  EntityDelete
);
