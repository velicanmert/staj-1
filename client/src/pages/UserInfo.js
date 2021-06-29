import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/Services';
import Parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import './UserInfo.css';

function UserInfo() {
  const [userData, setUserData] = useState('');

  const onClickForms = username => {
    localStorage.setItem('usernameForms', username);
  };

  useEffect(() => {
    getUsers().then(res => {
      setUserData(
        '<div>Username: ' +
          res.username +
          '</br>Date of birth: ' +
          res.dateBirth +
          '</br>ID no: ' +
          res.identificationNo +
          '</div>'
      );
    });
  }, []);

  return (
    <div className='userInfo'>
      {Parser(userData)}
      <Link
        className='forms'
        to={`/forms`}
        onClick={() => onClickForms(localStorage.getItem('username'))}
      >
        <span>Leave Forms</span>
      </Link>
    </div>
  );
}

export default UserInfo;
