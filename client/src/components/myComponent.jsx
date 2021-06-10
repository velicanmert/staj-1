import React, { Component } from 'react';
import Services from '../services/Services';

class MyComponent extends Component {
  state = {
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

  handleLoginButton = () => {
    console.log('You have clicked the login button!');
    Services.login('metehan.danaci', 'mete').then(response => {
      console.log(response.data);
    });
    /*Services.getUsers().then(response => {
      this.setState({ myText: response.data });
    });*/
    /*Services.getUsers().then(response => {
      console.log('sa');
      console.log(response.data);
    });*/
  };

  method() {
    return this.state.myText;
  }
}

export default MyComponent;
