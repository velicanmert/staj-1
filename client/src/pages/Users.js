import React, { useEffect, useState } from 'react';
import { showAllUsers } from '../services/Services';
import { Link } from 'react-router-dom';
import './Users.css';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    showAllUsers().then(res => {
      setUsers(res);
    });
  }, []);

  const onClickHandler = username => {
    console.log('username', username);
  };

  return (
    <div className='users'>
      {users.map(user => (
        <div className='users'>
          <div className='username'>{user.username}</div>
          <div>{user.identificationNo}</div>
          <div>{user.status}</div>
          <Link to={`/forms`} onClick={() => onClickHandler(user.username)}>
            <span>Forms</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Users;
