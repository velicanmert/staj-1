import React, { useEffect, useState } from 'react';
import { showAllUsers, deleteUser } from '../services/Services';
import { Link } from 'react-router-dom';
//import './Users.css';
import * as AiIcons from 'react-icons/ai';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align='right'>ID No</TableCell>
            <TableCell align='right'>Status</TableCell>
            <TableCell align='right'>Forms</TableCell>
            <TableCell align='right'>Delete / Activate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.username}>
              <TableCell component='th' scope='row'>
                {user.username}
              </TableCell>
              <TableCell align='right'>{user.identificationNo}</TableCell>
              <TableCell align='right'>{user.status}</TableCell>
              <TableCell align='right'>
                <Link to={`/forms`} onClick={() => onClickForms(user.username)}>
                  <span>Leave Forms</span>
                </Link>
              </TableCell>
              <TableCell align='right'>
                <AiIcons.AiFillDelete
                  onClick={() => onClickDelete(user.username)}
                ></AiIcons.AiFillDelete>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Users;
