import React, { useEffect, useState } from 'react';
import { showAllUsers } from '../services/Services';
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
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);

  const onClickDelete = async username => {
    await axios.delete(`http://localhost:8080/api/users/${username}/delete`);
    //deleteUser(username);
    showAllUsers().then(res => {
      setUsers(res);
    });
  };

  const onClickForms = username => {
    localStorage.setItem('usernameForms', username);
  };

  useEffect(() => {
    showAllUsers().then(res => {
      setUsers(res);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Kullanıcı Adı</TableCell>
            <TableCell align='right'>TC No</TableCell>
            <TableCell align='right'>Statü</TableCell>
            <TableCell align='right'>Formlar</TableCell>
            <TableCell align='right'>Sil / Aktifleştir</TableCell>
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
                  <span>İzin Formları</span>
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
