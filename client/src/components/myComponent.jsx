import React, { Component } from 'react';
import { getUsers, login } from '../services/Services';

class MyComponent extends Component {
  state = {
    myText: 'Test',
    token: ''
  };

  render() {
    return (
      <div>
        <img src={'https://picsum.photos/200'} alt='' />
        <div>
          <h1 style={{ fontSize: 20 }} className={'badge m-2 badge-primary'}>
            {this.method()}
          </h1>
        </div>
        <button onClick={this.handleLoginButton}>Login</button>
      </div>
    );
  }

  loginMethod = (id, pw) => {
    login(id, pw).then(response => {
      this.setState({ token: response });
    });
  };

  getUsersMethod = () => {
    getUsers().then(res => {
      console.log('metehan.danaci info:', res);
    });
  };

  handleLoginButton = () => {
    console.log('You have clicked the login button!');
    this.loginMethod('metehan.danaci', 'mete');
    console.log('login is done, getUsers will be done!');
    this.getUsersMethod();
  };

  method() {
    return this.state.myText;
  }
}

export default MyComponent;
