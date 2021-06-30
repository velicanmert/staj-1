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
        '<div>Kullanıcı Adı: ' +
          res.username +
          '</br>Doğum Tarihi: ' +
          res.dateBirth +
          '</br>TC No: ' +
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
        <span>İzin Formlarım</span>
      </Link>
    </div>
  );
}

export default UserInfo;
