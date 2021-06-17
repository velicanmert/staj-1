import React, { useState } from 'react';
import { editUser } from '../services/Services';
import { Form, Input, Button } from 'antd';
import './Edit.css';

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

  const handleEditButton = () => {
    console.log('You have clicked the edit button!');
    editMethod(bdate, idno);
    console.log('edit is done!');
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Edit;
