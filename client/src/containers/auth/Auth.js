import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/auth';
import { checkValidity } from '../../shared/utility';
import Input from '../../components/ui/input/Input';
import Button from '../../components/ui/button/Button';
import Spinner from '../../components/ui/spinner/Spinner';
import './Auth.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: { type: 'email', placeholder: 'E-mail address' },
        value: 't2@t2.com',
        validation: { required: true, isEmail: true },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: { type: 'password', placeholder: 'Password' },
        value: 't2',
        validation: { required: true, minLength: 6 },
        valid: false,
        touched: false
      }
    },
    isSignUp: false // true
  };

  componentDidMount() {
    // if (!this.props.doingSomethingSpecial && this.props.authRedirectPath !== '/') {
    if (this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    // Bu metodun biraz daha komplike sekilde benzerini ContactData.js'de yaptik.

    // Deep clone yapmaz!!!
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        touched: true,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        )
      }
    };

    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault(); // To prevent reloading of the page

    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const formElementsArray = [];

    // Use for…of to iterate over the values in an iterable, like an array for example. Strings are also an iterable type, so you can use for…of on strings:
    // Use for…in to iterate over the properties of an object (the object keys):
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formEl => (
      <Input
        key={formEl.id}
        elementType={formEl.config.elementType}
        elementConfig={formEl.config.elementConfig}
        value={formEl.config.value}
        invalid={!formEl.config.valid}
        shouldValidate={formEl.config.validation}
        touched={formEl.config.touched}
        changed={event => this.inputChangedHandler(event, formEl.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      // Firebase bize error nesnesi icinde 'message' alani gonderiyor:
      errorMessage = <p>{this.props.error.message}</p>;
    }

    // Username ve password girdikten sonra signin olunca, artik bu sayfada kalmasina gerek yok. Redirect edip, baska sayfaya yonlendiriyoruz.
    let authRedirect = null;
    if (this.props.isSignedIn) {
      // authRedirect = <Redirect to="/" />;
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className="Auth">
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}

          <Button btnType="Success">SUBMIT</Button>
        </form>

        {/* <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
        </Button> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isSignedIn: state.auth.isSignedIn,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  // setAuthRedirectPath fonksiyonunda burada hardcoded yaptik path param'i.
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
