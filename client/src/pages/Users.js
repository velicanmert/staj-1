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
    console.log('usernameForms', username);
    localStorage.setItem('usernameForms', username);
  };

  return (
    <div>
      {users.map(user => (
        <div className='users'>
          <div className='username'>Username: {user.username}</div>
          <div>ID No: {user.identificationNo}</div>
          <div>Status: {user.status}</div>
          <Link to={`/forms`} onClick={() => onClickHandler(user.username)}>
            <span>Leave Forms</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Users;
