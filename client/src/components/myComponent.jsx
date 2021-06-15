import React, { Component } from 'react';
import { editUser, getUsers, login } from '../services/Services';

class MyComponent extends Component {
  state = {
    myText: 'Test',
    token: ''
  };

  render() {
    return (
      <div>
        <div>
          <h1 style={{ fontSize: 20 }} className={'badge m-2 badge-primary'}>
            {this.method()}
          </h1>
        </div>
        <button onClick={this.handleLoginButton}>Login</button>
        <button onClick={this.handleGetUsersButton}>Get Users</button>
        <button onClick={this.handleEditButton}>Edit</button>
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

  editMethod = () => {
    editUser();
  };

  delay = ms => new Promise(res => setTimeout(res, ms));

  handleLoginButton = async () => {
    console.log('You have clicked the login button!');
    this.loginMethod('metehan.danaci', 'mete');
    await this.delay(1000);
    console.log('login is done!');
  };

  handleGetUsersButton = async () => {
    console.log('You have clicked the getUsers button!');
    this.getUsersMethod();
    await this.delay(1000);
    console.log('get users is done!');
  };

  handleEditButton = async () => {
    console.log('You have clicked the edit button!');
    this.editMethod();
    await this.delay(1000);
    console.log('edit is done!');
  };

  method() {
    return this.state.myText;
  }
}

export default MyComponent;
