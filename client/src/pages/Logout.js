import React from 'react';

function Logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  return <div className='logout'>You have successfully logged out</div>;
}

export default Logout;
