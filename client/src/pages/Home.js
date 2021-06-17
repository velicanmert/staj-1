import React from 'react';
import { Form, Input, Button } from 'antd';
import './Home.css';
import { login } from '../services/Services';

function Home() {
  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16
    }
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const state = {
    pw: ''
  };

  const getUserName = value => {
    localStorage.setItem('username', value);
  };

  const getPassword = value => {
    state.pw = value;
  };

  const loginMethod = (id, pw) => {
    login(id, pw);
  };

  const handleLoginButton = () => {
    console.log('You have clicked the login button!');
    console.log(localStorage.getItem('username'), state.pw);
    loginMethod(localStorage.getItem('username'), state.pw);
    console.log('login is done!');
  };

  if (localStorage.getItem('token')) {
    return (
      <Form className='welcome'>
        <div>
          Welcome<div>{localStorage.getItem('username')}</div>
        </div>
      </Form>
    );
  } else {
    return (
      <Form
        className='page'
        {...layout}
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your username!'
            }
          ]}
        >
          <Input
            placeholder='username'
            onChange={event => getUserName(event.target.value)}
          />
        </Form.Item>

        <Form.Item
          className='password'
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password
            placeholder='password'
            onChange={event => getPassword(event.target.value)}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            className='SubmitLogin'
            type='primary'
            htmlType='submit'
            onClick={handleLoginButton}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Home;
