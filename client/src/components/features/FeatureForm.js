import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class FeatureForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    // Burada field olan div'e error class'ini da eklersek hem label
    // hem de input kirmizi oluyor. Fakat kullanici input girmis olsun
    // yada olmasin, hep kirmizi oluyor. O nedenle biraz lojic eklememiz
    // gerekiyor.
    //   <div className="field error">

    // Conditional styling:
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {/* <div>{meta.error}</div> */}
        {this.renderError(meta)}
      </div>
    );
  };

  // renderInput(formProps) {
  //   console.log(formProps.input);
  //   // return (
  //   //   <input
  //   //     onChange={formProps.input.onChange}
  //   //     value={formProps.input.value}
  //   //   />
  //   // );
  //   //
  //   return <input {...formProps.input} />;
  // }

  onSubmit = formValues => {
    // Redux-form kullandigimiz icin artik preventDefault metodunu cagirmamiza
    // gerek yok. Redux-form bunu bizim icin yapiyor:
    //   event.preventDefault();
    //

    this.props.onSubmit(formValues);
  };

  render() {
    // console.log(this.props);
    // - Field doesn't know how to render a textbox etc by itself.
    // - Buradaki handleSubmit metodunu bize Redux-form provide ediyor.
    // - Burada form tag'ine 'error' class ismi de vermemizin sebebi:
    //   Semantic ui default olarak error mesajlarini gostermiyor (display: none).
    //   Gostermesi icin bu class'i koyduk.
    //
    // Buradaki Field component bizim verdigimiz label prop'i bilmiyor normalde.
    // Sadece bizim verdigimiz bu prop'lari component prop'ta verdigimiz
    // 'this.renderInput' props olarak veriyor.
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

// Buradaki 'FeatureForm' ismini biz verdik. Can be anything.
// This component doesn't need to call any Action Creator. The parent of this
// component will call that. So we don't need the 'connect' function here.
export default reduxForm({
  form: 'FeatureForm',
  validate
})(FeatureForm);
