import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFeatures } from '../../store/actions';

class FeatureList extends Component {
  componentDidMount() {
    this.props.fetchFeatures();
  }

  renderAdmin = feature => {
    if (feature.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          {/* <button className="ui button primary">Edit</button> */}
          {/* <button className="ui button negative">Delete</button> */}
          <Link to={`/features/edit/${feature.id}`}>
            <i className="large middle aligned icon edit" />
          </Link>
          <Link to={`/features/delete/${feature.id}`}>
            <i className="large middle aligned red icon trash" />
          </Link>
        </div>
      );
    }
  };

  renderList = () => {
    console.log('Inside renderList: ', this.props.features);
    return this.props.features.map(feature => {
      return (
        <div className="item" key={feature.id}>
          {this.renderAdmin(feature)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/features/${feature.id}`} className="header">
              {feature.id}
              {': '}
              {feature.title}
            </Link>
            <div className="description">{feature.description}</div>
          </div>
        </div>
      );
    });
  };

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/features/new" className="ui button primary">
            Create Feature
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Features</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

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
  // console.log('Inside FeatureList mapStateToProps', state.features);
  return {
    features: Object.values(state.features),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchFeatures })(FeatureList);
