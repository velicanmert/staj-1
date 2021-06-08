import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchView, deleteView } from '../../store/actions/viewActions';
import history from '../../history';
import Modal from '../Modal';

const ViewDelete = props => {
  const { token, match, view, fetchView, deleteView } = props;

  useEffect(() => {
    fetchView(match.params.id, token);

    // setTimeout denemesi: Asagidaki renderContent metodunda ekranda ilk load
    // ederken ve sonrasinda farkli mesajlar gosterildigini gormek icin test:
    //setTimeout(() => fetchView(match.params.id), 3000);
  }, [token, match, fetchView]);

  const renderActions = () => {
    const actions = (
      <>
        <button
          onClick={() => deleteView(match.params.id, token)}
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
    if (!view) {
      return `${message} this view?`;
    }

    return (
      <div>
        {`${message} the view with the following key?`}
        <p>{`${view.viewKey}`}</p>
      </div>
    );
  };

  // Component ilk render edildiginde henuz daha componentDidMount cagrilmadigi
  // icin, bizim view nesnesi load edilmemis oluyor. O nedenle burada null check
  // gibi birseyler yapmamiz gerekiyor.
  // ViewEdit component'da bunu Loading... gostererek asagidaki sekilde yapmistik
  // ama ViewDelete icin burada renderContent metodu ile yapacagiz.
  // if (!this.props.view) {
  //   return <div>Loading....</div>;
  // }

  return (
    <div className="deneme">
      <Modal
        title="Delete View"
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
    view: state.views[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchView, deleteView })(
  ViewDelete
);
