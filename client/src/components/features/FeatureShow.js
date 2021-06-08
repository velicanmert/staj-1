import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFeature } from '../../store/actions';

class FeatureShow extends Component {
  componentDidMount() {
    this.props.fetchFeature(this.props.match.params.id);
  }

  render() {
    if (!this.props.feature) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.feature;

    return (
      <div>
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { feature: state.features[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchFeature })(FeatureShow);
