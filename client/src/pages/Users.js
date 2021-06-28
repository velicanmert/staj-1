import React, { useEffect, useState } from 'react';
import { showAllUsers, deleteUser } from '../services/Services';
import { Link } from 'react-router-dom';
import './Users.css';
import * as AiIcons from 'react-icons/ai';

function Users() {
  const [users, setUsers] = useState([]);

  const onClickDelete = username => {
    deleteUser(username);
  };

  const onClickForms = username => {
    localStorage.setItem('usernameForms', username);
  };

  useEffect(() => {
    showAllUsers().then(res => {
      setUsers(res);
    });
  }, [onClickDelete]);

  return (
    <div>
      {users.map(user => (
        <div className='users'>
          <div className='username'>Username: {user.username}</div>
          <div>ID No: {user.identificationNo}</div>
          <div>Status: {user.status}</div>
          <Link to={`/forms`} onClick={() => onClickForms(user.username)}>
            <span>Leave Forms</span>
          </Link>
          <Link className='delete'>
            <AiIcons.AiFillDelete
              onClick={() => onClickDelete(user.username)}
            ></AiIcons.AiFillDelete>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Users;
