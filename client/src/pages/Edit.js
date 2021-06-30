import React, { useState } from 'react';
import { editUser } from '../services/Services';
import { Form, Input, Button } from 'antd';
import './Edit.css';
import { useHistory } from 'react-router-dom';

function Edit() {
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

  const [bdate, setBdate] = useState('');
  const [idno, setIdno] = useState('');

  const getBdate = value => {
    setBdate(value);
  };

  const getIdno = value => {
    setIdno(value);
  };

  const editMethod = (bd, idno) => {
    editUser(bd, idno);
  };

  let history = useHistory();
  const handleEditButton = () => {
    editMethod(bdate, idno);
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
        label='Doğum Tarihi'
        name='bdate'
        rules={[
          {
            required: true,
            message: 'Please input your birth date!'
          }
        ]}
      >
        <Input
          placeholder='gg-aa-yyyy'
          onChange={event => getBdate(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        className='idno'
        label='TC No'
        name='idno'
        rules={[
          {
            required: true,
            message: 'Please input your id no!'
          }
        ]}
      >
        <Input
          placeholder='**********'
          onChange={event => getIdno(event.target.value)}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          className='SubmitEdit'
          type='primary'
          htmlType='submit'
          onClick={handleEditButton}
        >
          Gönder
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Edit;
