import React, { useEffect, useState } from 'react';
import { showForms } from '../services/Services';
//import './Forms.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Forms() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    showForms(localStorage.getItem('usernameForms')).then(res => {
      setForms(res);
    });
    localStorage.removeItem('usernameForms');
  }, []);

  /*return (
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
  );*/

  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align='right'>Start Date</TableCell>
            <TableCell align='right'>Day Count</TableCell>
            <TableCell align='right'>Type</TableCell>
            <TableCell align='right'>Reason</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forms.map(form => (
            <TableRow key={form.username}>
              <TableCell component='th' scope='row'>
                {form.username}
              </TableCell>
              <TableCell align='right'>{form.date}</TableCell>
              <TableCell align='right'>{form.count}</TableCell>
              <TableCell align='right'>{form.type}</TableCell>
              <TableCell align='right'>{form.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Forms;
