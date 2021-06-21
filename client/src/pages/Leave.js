import React, { useState } from 'react';
import { leave } from '../services/Services';
import { Form, Input, Button } from 'antd';
import DatePicker from 'react-datepicker';
import './Leave.css';
import { useHistory } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

function Leave() {
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

  const [selectedDate, setSelectedDate] = useState();

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const state = {
    count: '',
    type: '',
    reason: ''
  };

  const getCount = value => {
    state.count = value;
  };

  const getType = value => {
    state.type = value;
  };

  const getReason = value => {
    state.reason = value;
  };

  const leaveMethod = (id, date, count, type, reason) => {
    leave(id, date, count, type, reason);
  };

  let history = useHistory();

  const handleLeaveFormButton = () => {
    console.log(
      'username',
      localStorage.getItem('username'),
      'date',
      state.selectedDate,
      'count',
      state.count,
      'type',
      state.type,
      'reason',
      state.reason
    );
    leaveMethod(
      localStorage.getItem('username'),
      state.selectedDate,
      state.count,
      state.type,
      state.reason
    );
    history.push('/home');
  };

  return (
    <Form
      className='page'
      {...layout}
      name='basic'
      direction='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item className='datePicker' label='DatePicker'>
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat='dd-MM-yyyy'
        />
      </Form.Item>

      <Form.Item
        className='count'
        label='Day Count'
        name='count'
        rules={[
          {
            required: true,
            message: 'Please input your day count of leave!'
          }
        ]}
      >
        <Input
          placeholder='day count'
          onChange={event => getCount(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        className='type'
        label='Type'
        name='type'
        rules={[
          {
            required: true,
            message: 'Please input your type of leave!'
          }
        ]}
      >
        <Input
          placeholder='type'
          onChange={event => getType(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        className='reason'
        label='Reason'
        name='reason'
        rules={[
          {
            required: true,
            message: 'Please input your reason of leave!'
          }
        ]}
      >
        <Input
          placeholder='reason'
          onChange={event => getReason(event.target.value)}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          className='SubmitLeaveForm'
          type='primary'
          htmlType='submit'
          onClick={handleLeaveFormButton}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Leave;
