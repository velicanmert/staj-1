import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFeature, editFeature } from '../../store/actions';
import FeatureForm from './FeatureForm';

// DO NOT FORGET TO LOOK AT FeatureEdit_old.js file to see the stuff that is
// before the refactoring happened here.
class FeatureEdit extends Component {
  componentDidMount() {
    this.props.fetchFeature(this.props.match.params.id);
  }

  onSubmit = formValues => {
    // console.log('Inside FeatureEdit onSubmit: ', formValues);
    this.props.editFeature(this.props.match.params.id, formValues);
  };

  render() {
    console.log('This is props: ', this.props);

    if (!this.props.feature) {
      return <div>Loading....</div>;
    }

    // Since FeatureForm is wrapped by ReduxForm, here we are not actually passing props
    // to our FeatureForm. Technically, we're passing props to ReduxForm and it's passing
    // those props to our FeatureForm. There is a special prop that ReduxForm receives, and
    // that is 'initialValues'. We use that here in our FeatureEdit component, but we don't
    // use it in the FeatureCreate component!
    return (
      <div>
        <h3>Edit a Feature</h3>
        <FeatureForm
          // // Section 20, Lecture 265:
          //
          // // This is one way of doing it:
          // initialValues={{ title: 'EDIT ME', description: 'HERE IS A DESC' }}
          //
          // // Here is a second way:
          // // Note that this.props.feature is an object with title and description properties.
          // // However, if we do the following, then we'll receive extra properties (id and userId)
          // // on the FeatureForm side. And we don't want to push those properties to the backend
          // // server since we don't edit those fields. Maybe some backup server will validate
          // // and complain about it later on.
          // initialValues={this.props.feature}
          //
          // // Here is another way:
          initialValues={_.pick(this.props.feature, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { feature: state.features[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchFeature, editFeature })(
  FeatureEdit
);
