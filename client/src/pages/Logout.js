import React from 'react';

function Logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
  return <div className='logout'>You have successfully logged out</div>;
}

export default Logout;
