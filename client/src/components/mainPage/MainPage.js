import React from 'react';

import underConstruction from '../../assets/200w.webp';

const mainPage = props => {
  return (
    <div style={mainStyle}>
      <h2>Konfigurasyon İşlemleri</h2>
      <h3>Under construction...</h3>
      <img src={underConstruction} alt="under construction..." />
    </div>
  );
};

const mainStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

export default mainPage;
