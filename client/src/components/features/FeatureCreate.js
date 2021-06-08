import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createFeature } from '../../store/actions';
import FeatureForm from './FeatureForm';

class FeatureCreate extends Component {
  onSubmit = formValues => {
    // Redux-form kullandigimiz icin artik preventDefault metodunu cagirmamiza
    // gerek yok. Redux-form bunu bizim icin yapiyor:
    //   event.preventDefault();
    //

    this.props.createFeature(formValues);
  };

  render() {
    // Since FeatureForm is wrapped by ReduxForm, here we are not actually passing props
    // to our FeatureForm. Technically, we're passing props to ReduxForm and it's passing
    // those props to out FeatureForm. There is a special prop that ReduxForm receives, and
    // that is 'initialValues'. We use that in our FeatureEdit component.
    return (
      <div>
        <h3>Create a Feature</h3>
        <FeatureForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createFeature })(FeatureCreate);
