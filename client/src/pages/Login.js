import React from 'react';
import { login } from '../services/Services';
import { Form, Input, Button } from 'antd';
import './Login.css';
import { useHistory } from 'react-router-dom';

function Login() {
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
    pw: '',
    userName: '',
    token: ''
  };

  const getUserName = value => {
    localStorage.setItem('username', value);
    state.userName = value;
    if (state.userName === 't2admin') {
      localStorage.setItem('isAdmin', 1);
    } else {
      localStorage.setItem('isAdmin', 0);
    }
  };

  const getPassword = value => {
    state.pw = value;
  };

  const loginMethod = (id, pw) => {
    login(id, pw).then(res => {
      state.token = res;
    });
  };

  let history = useHistory();

  const handleLoginButton = () => {
    loginMethod(localStorage.getItem('username'), state.pw);
    history.push('/home');
  };

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

export default Login;
