import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchFeature, deleteFeature } from '../../store/actions';
import history from '../../history';
import Modal from '../Modal';

class FeatureDelete extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchFeature(this.props.match.params.id);

    // setTimeout denemesi: Asagidaki renderContent metodunda ekranda ilk load
    // ederken ve sonrasinda farkli mesajlar gosterildigini gormek icin test:
    //setTimeout(() => this.props.fetchFeature(this.props.match.params.id), 3000);
  }

  renderActions() {
    // REACT FRAGMENTS: Here we have to enclose the 2 buttons with a tag. If we
    // use a div tag, then in the Modal component where we place these actions,
    // the semantic ui modal css will be broken. It expects button tags within
    // the actions div there. In order not to break that, here instead of a div
    // wrapper, we use React.Fragment as the wrapper.
    //
    // React Fragments: It's like an invisible element that doesn't have an impact on the dom.
    // It doesn't actually produce any html on the dom. We use them when for example we need
    // to wrap two adjacent elements to return a JSX but we don't want the wrapper div to appear
    // in the dom. Bazen wrapper koymak zorunda kaliyoruz ama bu da css'i bozuyor bir sekilde.
    // Bu durumlarda bize flexibility sagliyor.
    //
    // const actions = (
    //   <div>
    //     <button className="ui button negative">Delete</button>
    //     <button className="ui button">Cancel</button>
    //   </div>
    // );
    //
    // const actions = (
    //   <React.Fragment>
    //     <button className="ui button negative">Delete</button>
    //     <button className="ui button">Cancel</button>
    //   </React.Fragment>
    // );
    //
    // Veya daha basit olarak asagidaki empty-tag syntax var. Fakat bazi quality code
    // checker tool'lar buna kiziyormus, <React.Fragment> seklinde kullanmak daha iyi
    // olabiliyormus.

    const { id } = this.props.match.params;

    const actions = (
      <>
        <button
          onClick={() => this.props.deleteFeature(id)}
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
  }

  renderContent() {
    const message = 'Are you sure you want to delete ';
    if (!this.props.feature) {
      return `${message} this feature?`;
    }

    return `${message} the feature with title: ${this.props.feature.title}`;
  }

  render() {
    // Component ilk render edildiginde henuz daha componentDidMount cagrilmadigi
    // icin, bizim feature nesnesi load edilmemis oluyor. O nedenle burada null check
    // gibi birseyler yapmamiz gerekiyor.
    // FeatureEdit component'da bunu Loading... gostererek asagidaki sekilde yapmistik
    // ama FeatureDelete icin burada renderContent metodu ile yapacagiz.
    // if (!this.props.feature) {
    //   return <div>Loading....</div>;
    // }

    return (
      <div className="deneme">
        <Modal
          title="Delete Feature"
          content={this.renderContent()}
          actions={this.renderActions()} // We need to call the function
          onDismiss={() => history.push('/')}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { feature: state.features[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchFeature, deleteFeature })(
  FeatureDelete
);
