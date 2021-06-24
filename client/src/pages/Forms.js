import React, { useEffect, useState } from 'react';
import { showForms } from '../services/Services';
import './Forms.css';

function Forms() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    showForms(localStorage.getItem('usernameForms')).then(res => {
      setForms(res);
    });
    localStorage.removeItem('usernameForms');
  }, []);

  return (
    <div>
      {forms.map(form => (
        <div className='forms'>
          <div className='username'>Username: {form.username}</div>
          <div>Start Date: {form.date}</div>
          <div>Day Count: {form.count}</div>
          <div>Type: {form.type}</div>
          <div>Reason: {form.reason}</div>
        </div>
      ))}
    </div>
  );
}

export default Forms;
