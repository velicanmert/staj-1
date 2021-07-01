import React, { useState } from 'react';
import { login, getUsers } from '../services/Services';
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

  let history = useHistory();

  const [errorM, setErrorM] = useState('');

  const loginMethod = (id, pw) => {
    setErrorM(
      'Girilen kullanıcı adı ve şifre ikilisi sistemde bulunmamaktadır!'
    );
    login(id, pw).then(res => {
      state.token = res;
      getUsers().then(ress => {
        if (ress.status === 'active') {
          setErrorM('');
          localStorage.setItem('token', state.token);
          history.push('/home');
        } else {
          setErrorM(
            'Aktif bir kullanıcı değilsiniz! Lütfen, adminle iletişime geçin.'
          );
        }
      });
    });
  };

  const handleLoginButton = () => {
    loginMethod(localStorage.getItem('username'), state.pw);
  };

  return (
    <Form
      className='page'
      {...layout}
      name='basic'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div className='errorM'>{errorM}</div>
      <Form.Item
        label='Kullanıcı Adı'
        name='username'
        rules={[
          {
            required: true,
            message: 'Please input your username!'
          }
        ]}
      >
        <Input
          placeholder='kullanıcı adı'
          onChange={event => getUserName(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        className='password'
        label='Şifre'
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
      >
        <Input.Password
          placeholder='şifre'
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
          Giriş
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
