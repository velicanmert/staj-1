import React from 'react';

function Logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
  return <div className='logout'>Başarıyla çıkış yaptınız!</div>;
}

export default Logout;
