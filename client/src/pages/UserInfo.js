import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/Services';
import Parser from 'html-react-parser';

function UserInfo() {
  const [userData, setUserData] = useState('');

  useEffect(() => {
    getUsers().then(res => {
      setUserData(
        '<div> Username: ' +
          res.username +
          '</br>Date of birth: ' +
          res.dateBirth +
          '</br>ID no: ' +
          res.identificationNo +
          '</div>'
      );
    });
  }, [getUsers]);

  return (
    <div className='userInfo'>
      <div>{Parser(userData)}</div>
    </div>
  );
}

export default UserInfo;
