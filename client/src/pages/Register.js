import React from 'react';
import { register } from '../services/Services';
import { Form, Input, Button } from 'antd';
import './Register.css';
import { useHistory } from 'react-router-dom';

function Register() {
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
    id: '',
    bdate: '',
    idno: ''
  };

  const getId = value => {
    state.id = value;
  };

  const getPassword = value => {
    state.pw = value;
  };

  const getBdate = value => {
    state.bdate = value;
  };

  const getIdno = value => {
    state.idno = value;
  };

  const registerMethod = (id, pw, bdate, idno) => {
    register(id, pw, bdate, idno);
  };

  let history = useHistory();

  const handleRegisterButton = () => {
    registerMethod(state.id, state.pw, state.bdate, state.idno);
    history.push('/');
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
          onChange={event => getId(event.target.value)}
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

      <Form.Item
        className='bdate'
        label='Birth Date'
        name='bdate'
        rules={[
          {
            required: true,
            message: 'Please input your birth date!'
          }
        ]}
      >
        <Input
          placeholder='dd-mm-yyyy'
          onChange={event => getBdate(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        className='idno'
        label='Identification No'
        name='idno'
        rules={[
          {
            required: true,
            message: 'Please input your identification no!'
          }
        ]}
      >
        <Input
          placeholder='***********'
          onChange={event => getIdno(event.target.value)}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          className='SubmitRegister'
          type='primary'
          htmlType='submit'
          onClick={handleRegisterButton}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Register;
