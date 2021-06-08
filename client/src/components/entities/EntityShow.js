import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchEntity } from '../../store/actions/entityActions';

const EntityShow = props => {
  const { token, match, entity, fetchEntity } = props;

  useEffect(() => {
    fetchEntity(match.params.id, token);
  }, [token, match, fetchEntity]);

  if (!entity) {
    return <div>Loading...</div>;
  }

  const { entityKey, enValue, trValue } = entity;

  return (
    <div>
      <h5>{entityKey}</h5>
      <div>{enValue}</div>
      <div>{trValue}</div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.auth.token,
    entity: state.entities[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchEntity })(EntityShow);
